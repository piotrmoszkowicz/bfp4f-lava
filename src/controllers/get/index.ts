import Bluebird from "bluebird";
import { Buffer } from "buffer";
import { Response, Router } from "express";
import { readFile } from "fs";
import path from "path";

import { RequestBFP4F } from "ExpressOverride";

import { getApparelJson } from "./getApparelJson";
import { getAttachmentsJson } from "./getAttachmentsJson";
import { getBoostersJson } from "./getBoostersJson";
import { getBundlesJson } from "./getBundlesJson";
import { getSoldiers } from "./getSoldiers";
import { getVip } from "./getVip";
import { getWalletBalance } from "./getWalletBalance";
import { getWeaponsJson } from "./getWeaponsJson";

import Logger from "../../util/logger";

const readFileAsync = Bluebird.promisify(readFile);

const router: Router = Router();

router.get(
  "/",
  async (req: RequestBFP4F, res: Response): Promise<any> => {
    try {
      const currentTrainigPoints = "0";
      const numberOfTrainingPointsPurchased = "0";
      const maxNumberOfExtraPoints = "10";
      const offersJson = [
        {
          offer: "OFB-BP4F:43014",
          cost: 75000,
          currency: "_AC",
          limit: "1 Training Point",
          isUnlimited: true
        },
        {
          offer: "OFB-BP4F:43015",
          cost: 7999,
          currency: "_PF",
          limit: "1 Training Point",
          isUnlimited: true
        },
        {
          offer: "OFB-BP4F:43016",
          cost: 27299,
          currency: "_PF",
          limit: "5 Training Points",
          isUnlimited: true
        },
        {
          offer: "OFB-BP4F:43017",
          cost: 52499,
          currency: "_PF",
          limit: "10 Training Points",
          isUnlimited: true
        }
      ];
      const html = (await readFileAsync(
        path.join(__dirname + "../../../../html/index.html")
      ))
        .toString()
        .replace(/%numberOfTrainingPointsPurchased%/g, maxNumberOfExtraPoints)
        .replace(/%maxNumberOfExtraPoints%/g, numberOfTrainingPointsPurchased)
        .replace("%trainingPointsOffers%", JSON.stringify(offersJson));

      return res.type("html").send(html);
    } catch (err) {
      Logger.error(err);
    }
  }
);
router.get("/getApparelJson", getApparelJson);
router.get("/getAttachmentsJson", getAttachmentsJson);
router.get("/getBundlesJson", getBundlesJson);
router.get("/getBoostersJson", getBoostersJson);
router.get("/getSoldiers", getSoldiers);
router.get("/getVip", getVip);
router.get("/getWalletBalance", getWalletBalance);
router.get("/getWeaponsJson", getWeaponsJson);

export { router as GetRoutes };
