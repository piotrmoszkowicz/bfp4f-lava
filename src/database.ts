import config from "config";
import ConfigType from "ConfigType";
import Sequelize from "sequelize";
import Logger from "./util/logger";

const dbConfig: ConfigType = config.get("database");

const database = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.password,
  {
    dialect: dbConfig.engine,
    host: dbConfig.host,
    logging: msg => Logger.info(msg),
    pool: {
      idle: dbConfig.maxIdleTime,
      max: dbConfig.maxConnections,
      min: dbConfig.minConnections
    },

    port: dbConfig.port,
    timezone: "+02:00"
  }
);
export default database;
