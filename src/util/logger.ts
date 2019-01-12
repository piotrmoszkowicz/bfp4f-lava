import winston from "winston";
import Sentry from "winston-sentry-raven-transport";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
    new Sentry({
      level: "warn",
      dsn: "https://20ceb3e80a8e493285dd44def5376748@sentry.io/1366619",
      patchGlobal: true
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
