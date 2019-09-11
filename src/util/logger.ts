import config from "config";
import winston from "winston";
import Sentry from "winston-sentry-raven-transport";

const { combine, timestamp, prettyPrint } = winston.format;

const transports: any = [
  new winston.transports.Console({
    level: config.get("lava.debug") ? "debug" : "info"
  })
];

if (config.get("lava.debug")) {
  transports.push(
    new winston.transports.File({ filename: "debug.log", level: "debug" })
  );
} else {
  transports.push(
    new Sentry({
      level: "warn",
      dsn: config.get("lava.dsn"),
      patchGlobal: true
    })
  );
}

const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports
});

if (config.get("lava.debug")) {
  logger.log("debug", "Logging initialized at debug level");
}

export default logger;
