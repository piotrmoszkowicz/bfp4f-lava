import config from "config";
import winston from "winston";
import Sentry from "winston-sentry-raven-transport";


const { combine, timestamp, prettyPrint } = winston.format;

const transports = [
  new winston.transports.Console({
    level: config.get("lava.debug") ? "debug" : "warn"
  }),
  new Sentry({
    level: "warn",
    dsn: "https://20ceb3e80a8e493285dd44def5376748@sentry.io/1366619",
    patchGlobal: true
  })
];

if (config.get("lava.debug")) {
  transports.push(new winston.transports.File({ filename: "debug.log", level: "debug" }));
}

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports
});

if (config.get("lava.debug")) {
  logger.log("debug", "Logging initialized at debug level" );
}

export default logger;
