import "module-alias/register";

import config from "config";
import connectRedis from "connect-redis";
import fastify from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifyCors from "fastify-cors";
import fastifyFormBody from "fastify-formbody";
import fastifySession from "fastify-session";

import database from "@/database";
import redisClient from "@/redis";
import gameController from "@controllers/game";
import htmlController from "@controllers/html";
import soldierService from "@services/soldierService";
import Logger from "@util/logger";

const app = fastify();

const RedisStore = connectRedis(fastifySession);

const { cookieConfig, interfacePort, sessionSecret } = config.get("lava");

const corsOptions = {
  credentials: true,
  origin: true,
};

const sessionOptions = {
  secret: sessionSecret,
  saveUninitialized: true,
  store: new RedisStore({
    client: redisClient,
  }),
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: cookieConfig.maxAge,
    domain: cookieConfig.domain,
  },
};

app.register(fastifyCors, corsOptions);
app.register(fastifyFormBody);
app.register(fastifyCookie);
app.register(fastifySession, sessionOptions);

app.addHook("preHandler", (req, res, next) => {
  if (!req.cookies || !req.cookies.magma) {
    return res.status(401).send({
      error: "No magma cookie! What are you looking here for?",
    });
  }

  req.session.sid = req.cookies.magma.substring(
    0,
    req.cookies.magma.length - 16
  );

  next();
});

app.addHook("preHandler", async (req, res) => {
  if (!req.session.soldier) {
    // TODO: Think about re-getting soldier session (level may change)
    try {
      req.session.soldier = await soldierService.getMainSoldierIdBySessionId(
        req.session.sid
      );
    } catch (err) {
      Logger.log("error", "Error during getting main soldier", {
        message: err,
      });
      return res.status(401).send("Oh uh, something went wrong");
    }
  }
});

app.register(htmlController, {
  prefix: "/en/game",
});

app.register(gameController, {
  prefix: "/en/game",
});

app.listen(interfacePort, "0.0.0.0", async (err) => {
  if (err) {
    Logger.log("error", "App error", { message: err });
    return;
  }
  await database.sync({ force: false });
  Logger.log("info", `App is running at 0.0.0.0:${interfacePort}`);
});

export default app;
