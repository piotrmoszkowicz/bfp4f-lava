import config from "config";
import ConfigType from "ConfigType";
import { Sequelize } from "sequelize-typescript";
import Logger from "./util/logger";

const dbConfig: ConfigType = config.get("database");

const database = new Sequelize({
  database: dbConfig.name,
  dialect: dbConfig.engine,
  host: dbConfig.host,
  logging: msg => Logger.info(msg),
  modelPaths: [__dirname + "/models/*"],
  password: dbConfig.password,
  pool: {
    idle: dbConfig.maxIdleTime,
    max: dbConfig.maxConnections,
    min: dbConfig.minConnections
  },
  port: dbConfig.port,
  timezone: "+02:00",
  username: dbConfig.user
});
export default database;
