import bluebird from "bluebird";
import config from "config";
import redis from "redis";

import Logger from "@util/logger";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const host : string = config.get("redis.host");

const client = redis.createClient({
  host,
  port: 6379
});

client.on("debug", message => {
  Logger.log("debug", "[REDIS]", { message });
});

client.on("error", err => {
  Logger.log("error", "[REDIS]", { message: err });
});

export default client;
