import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Response } from "express";
import expressSession from "express-session";
import expressValidator from "express-validator";
import { RequestBFP4F } from "ExpressOverride";
import path from "path";

import soldierService from "./services/soldierService";
import Logger from "./util/logger";

// Controllers (route handlers)
import { GameRouter } from "./controllers/game";
import { HtmlRouter } from "./controllers/html";

// Create Express server
const app = express();

const corsOptions = {
  credentials: true,
  origin: true
};

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(
  "/css",
  express.static(path.join(__dirname, "../", "public", "css")),
  cors(corsOptions)
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../", "public", "js")),
  cors(corsOptions)
);
app.use(
  "/static",
  express.static(path.join(__dirname, "../", "public", "static")),
  cors(corsOptions)
);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../", "public", "uploads")),
  cors(corsOptions)
);

app.use((req: RequestBFP4F, res: Response, next: NextFunction) => {
  if (!req.cookies || !req.cookies.magma) {
    res.status(401);
    res.json({
      error: "No magma cookie! What are you looking here for?"
    });
    return;
  }
  req.sessionId = req.cookies.magma;

  return next();
});

app.use(
  expressSession({
    genid: req => req.cookies.magma,
    secret: "zjskhdfg*&^%6521ya"
  })
);

app.use(async (req: RequestBFP4F, res: Response, next: NextFunction) => {
  if (!req.session.soldierId) {
    try {
      req.session.soldierId = (await soldierService.getMainSoldierIdBySessionId(
        req.sessionId
      )).id;
    } catch (err) {
      Logger.error("Error during getting main soldier", err);
    }
  }
  next();
});

/**
 * API examples routes.
 */
app.use("/en/game", HtmlRouter);
app.use("/en/game", GameRouter);

export default app;
