import config from "config";
import ConfigType from "ConfigType";
import Sequelize from "sequelize";
import Logger from "./util/logger";

const dbConfig: ConfigType = config.get("mybb");

/* const mybb = new Sequelize({
  database: dbConfig.name,
  dialect: dbConfig.engine,
  host: dbConfig.host,
  logging: msg => Logger.info("[MYBB]", msg),
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
export default mybb; */
