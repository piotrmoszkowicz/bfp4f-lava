import Bluebird from "bluebird";
import config from "config";
import { Response, Router } from "express";
import { readFile } from "fs";
import path from "path";

const readFileAsync = Bluebird.promisify(readFile);

import SoldierService from "../services/soldierService";
import WalletService from "../services/walletService";
import Logger from "../util/logger";

import { RequestBFP4F } from "ExpressOverride";

const router: Router = Router();

router.get(
  "/",
  async (req: RequestBFP4F, res: Response): Promise<any> => {
    try {
      const soldierStats = await SoldierService.getSoldierByID(
        req.session.soldierId,
        ["id", "kit", "level", "soldierName", "xp"]
      );
      const wallet = WalletService.parseWallet(
        await WalletService.getWalletBySessionId(req.sessionId)
      );

      const currentTrainingPoints = "0";
      const numberOfTrainingPointsPurchased = "0";
      const maxNumberOfExtraPoints = "10";

      const { interfaceUrl, interfacePort } = config.get("lava");

      const lastAuthed = +new Date();
      const timeNow = +new Date();

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

      const personaJson = {
        id: soldierStats.id,
        name: soldierStats.soldierName,
        kit: soldierStats.kit,
        xp: soldierStats.xp,
        xpForNextLevel: 800, // TODO: Add xpForNextLevel
        lastAuthenticated: lastAuthed.toString(), // TODO: Fix lastAuthed
        mugShot:
          "http://battlefield.play4free.com:3000/static/20140225100054/bulk-images/mugshots-64/6-7-9.png", // TODO: Add mugshots
        isMaxLevel: soldierStats.level === 30,
        level: soldierStats.level,
        levelUpProgression: 0, // TODO: Add level progression
        levelDescription: "Warrant Officer Silver" // TODO: Add level titles
      };

      const html = (await readFileAsync(
        path.join(__dirname + "../../../html/index.html")
      ))
        .toString()
        .replace(/%interfaceUrl%/g, interfaceUrl)
        .replace(/%interfacePort%/g, interfacePort.toString())
        .replace(/%soldierId%/g, soldierStats.id.toString())
        .replace(/%soldierName%/g, soldierStats.soldierName)
        .replace(/%level%/g, soldierStats.level.toString())
        .replace(/%funds%/g, wallet._PF.toString())
        .replace(/%credits%/g, wallet._AC.toString())
        .replace(/%lastAuthed%/g, lastAuthed.toString())
        .replace(/%timeNow%/g, timeNow.toString())
        .replace(/%numberOfTrainingPointsPurchased%/g, maxNumberOfExtraPoints)
        .replace(/%maxNumberOfExtraPoints%/g, numberOfTrainingPointsPurchased)
        .replace(/%trainingPointsOffers%/g, JSON.stringify(offersJson))
        .replace(/%personaJson%/g, JSON.stringify(personaJson));

      return res.type("html").send(html);
    } catch (err) {
      Logger.error(err);
    }
  }
);

export const HtmlRouter: Router = router;
