import config from "config";
import { Sequelize } from "sequelize-typescript";

import Logger from "@util/logger";

import ConfigType from "ConfigType";

const dbConfig: ConfigType = config.get("database");

let database;

try {
  database = new Sequelize({
    database: dbConfig.name,
    dialect: dbConfig.engine,
    host: dbConfig.host,
    logging: msg => Logger.log("debug", "[MYSQL]", { message: msg }),
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
} catch (err) {
  Logger.log("error", "Error during creating Lava DB Instance", {
    message: err
  });
}

export default database;
