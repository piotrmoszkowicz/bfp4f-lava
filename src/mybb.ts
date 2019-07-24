import config from "config";
import { Sequelize } from "sequelize-typescript";

import Logger from "@util/logger";

import ConfigType from "ConfigType";

const dbConfig: ConfigType = config.get("mybb");

let mybbDatabase;

try {
  mybbDatabase = new Sequelize({
    database: dbConfig.name,
    dialect: dbConfig.engine,
    host: dbConfig.host,
    logging: msg => Logger.log("debug", "[MYBB]", { message: msg }),
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
} catch (err) {
  Logger.log("error", "Error during creating MyBB DB Instance", {
    message: err
  });
}

export default mybbDatabase;
