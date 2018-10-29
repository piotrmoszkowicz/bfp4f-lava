import Bluebird from "bluebird";
import config from "config";
import { Response, Router } from "express";
import { readFile } from "fs";
import path from "path";

const readFileAsync = Bluebird.promisify(readFile);

import Logger from "../util/logger";

import { RequestBFP4F } from "ExpressOverride";

const router: Router = Router();

router.get("/game.css", async (req: RequestBFP4F, res: Response): Promise<any> => {
  try {
    const { interfaceUrl, interfacePort } = config.get("lava");

    const css = (await readFileAsync(
      path.join(__dirname + "../../../css/game.css")
    ))
      .toString()
      .replace(/%interfaceUrl%/g, interfaceUrl)
      .replace(/%interfacePort%/g, interfacePort.toString());

    return res.type("css").send(css);
  } catch (err) {
    Logger.error(err);
  }
});

export const CssRouter: Router = router;