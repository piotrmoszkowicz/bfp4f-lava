## Docker guide

Our lava server can be run by docker. Before you simply need to install docker itself.

You can either compose the image by yourself or use the one hosted by NommoPL on dockerhub. Before you can use the one
hosted you need to get access to the dockerhub. 
Ask NommoPL for it!

## Configuration

You need to specify all ENV variables before you can run the docker. The easiest way is to create new file
(for example config.env) with all ENVs inside.

## ENV LIST bfp4f-lava database

Variable                | Description
-----                   | -----------
`DATABASE_ENGINE`       | `bfp4f-lava` database engine (default: `mysql`)
`DATABASE_HOST`         | `bfp4f-lava` database host (default: `127.0.0.1`)
`DATABASE_MAX_CONN`     | `bfp4f-lava` database max connections (default: `25`)
`DATABASE_MAX_IDLE_MS`  | `bfp4f-lava` database max idle time in ms (default: `30000`)
`DATABASE_MIN_CONN`     | `bfp4f-lava` database min connections (default: `0`)
`DATABASE_NAME`         | `bfp4f-lava` database name
`DATABASE_PASSWORD`     | `bfp4f-lava` database password
`DATABASE_PORT`         | `bfp4f-lava` database port
`DATABASE_USER`          | `bfp4f-lava` database user

## ENV LIST MyBB database

Variable                | Description
-----                   | -----------
`MYBB_ENGINE`           | `MyBB Database` database engine (default: `mysql`)
`MYBB_HOST`             | `MyBB Database` database host (default: `127.0.0.1`)
`MYBB_MAX_CONN`         | `MyBB Database` database max connections (default: `25`)
`MYBB_MAX_IDLE_MS`      | `MyBB Database` database max idle time in ms (default: `30000`)
`MYBB_MIN_CONN`         | `MyBB Database` database min connections (default: `0`)
`MYBB_NAME`             | `MyBB Database` database name
`MYBB_PASSWORD`         | `MyBB Database` database password
`MYBB_PORT`             | `MyBB Database` database port
`MYBB_USER`             | `MyBB Database` database user

## ENV LIST bfp4f-lava configuration
Variable                | Description
-----                   | -----------
`REDIS_HOST`            | Redis host
`REDIS_PORT`            | Redis port

## ENV LIST bfp4f-lava configuration

Variable                | Description
-----                   | -----------
`NODE_ENV`              | Start mode (`development` / `test` / `stage` / `production`) - use production when you don't know what to do
`INTERFACE_URL`         | `bfp4f-lava` interface URL
`INTERFACE_PORT`        | `bfp4f-lava` interface port
`INTERFACE_DEBUG`       | Start game interface in DEBUG more (`true` / `false`)
`CDN_URL`               | URL to the CDN, where static files are stored

## How to run?
```$ docker run --network="host" -p 3000:3000 --env-file ./config.env nommopl/bfp4f-lava:latest```
