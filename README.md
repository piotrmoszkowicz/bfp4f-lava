# bfp4f-lava

Implementation of Battlefield Play4free's SHOP API in TypeScript/Node.JS.

## Requirements

Following stuff must be installed to make app working properly:

* [Node.js](http://nodejs.org) version 8.11.4

You can also run lava by Docker. More info [here](https://github.com/piotrmoszkowicz/bfp4f-lava/blob/master/DOCKER.md).

## Testing

App is using Jest test framework. Our goal is to have 70% of code tested.

## Tasks

Task            | Description
-----           | -----------
`start`         | Alias of `serve` - you can simply use `npm start`
`build`         | Launches commands `build-ts` and `tslint`
`serve`         | `node dist/server.js`
`watch`         | Watches via nodemon `dist/server.js`
`test`          | Runs all tests in `test` directory
`reformat`      | Runs prettier and tslint
`watch-test`    | Runs `test` with watcher
`build-ts`      | Builds JavaScript from TypeScript sources
`watch-ts`      | Runs `build-ts` with watcher
`tslint`        | Runs tslint to check styles
`debug`         | Runs `build` and `watch-debug` - development env task
`server-debug`  | Runs `server` via nodemon
`watch-debug`   | Concurrently runs `watch-ts` and `serve-debug`

## Develop

```sh 
$ npm run debug
```

Debugger port :6666