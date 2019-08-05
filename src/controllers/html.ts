import Bluebird from "bluebird";
import config from "config";
import { readFile } from "fs";
import path from "path";

const readFileAsync = Bluebird.promisify(readFile);

import SoldierService from "@services/soldierService";
import WalletService from "@services/walletService";
import Logger from "@util/logger";

const htmlHandler = async (req, res) => {
  try {
    const wallet = WalletService.parseWallet(
      await WalletService.getWalletBySessionId(req.session.sid)
    );

    const soldiers = await SoldierService.getSoldiersBySessionId(
      req.session.sid
    );

    const newPersonId = parseInt(req.query.personaId, 10);

    if (newPersonId > 0) {
      const newSoldier = soldiers.find(soldier => soldier.id === newPersonId);
      if (newSoldier !== null) {
        req.session.soldier = newSoldier;
      }
    }

    const currentTrainingPoints = "0";
    const numberOfTrainingPointsPurchased = "0";
    const maxNumberOfExtraPoints = "10";

    const { debug, interfaceUrl } = config.get("lava");
    const cdnUrl = config.get("cdn.url");

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
      id: req.session.soldier.id,
      name: req.session.soldier.soldierName,
      kit: req.session.soldier.kit,
      xp: req.session.soldier.xp,
      xpForNextLevel: 800, // TODO: Add xpForNextLevel
      lastAuthenticated: lastAuthed.toString(), // TODO: Fix lastAuthed
      mugShot: `${cdnUrl}/static/20140225100054/bulk-images/mugshots-64/6-7-9.png`, // TODO: Add mugshots
      isMaxLevel: req.session.soldier.level === 30,
      level: req.session.soldier.level,
      levelUpProgression: 0, // TODO: Add level progression
      levelDescription: "Warrant Officer Silver" // TODO: Add level titles
    };

    const personasJson = soldiers.map(soldier => ({
      id: soldier.id,
      name: soldier.soldierName,
      kit: soldier.kit,
      xp: soldier.xp,
      xpForNextLevel: 800, // TODO: Add xpForNextLevel
      lastAuthenticated: lastAuthed.toString(), // TODO: Fix lastAuthed
      mugShot: `${cdnUrl}/static/20140225100054/bulk-images/mugshots-64/6-7-9.png`, // TODO: Add mugshots
      isMaxLevel: soldier.level === 30,
      level: soldier.level,
      levelUpProgression: 0, // TODO: Add level progression
      levelDescription: "Warrant Officer Silver" // TODO: Add level titles
    }));

    const firebugLink = debug
      ? `<script type='text/javascript' src='${cdnUrl}/js/firebug-lite.js'></script>`
      : "";

    const html = (await readFileAsync(
      path.join(__dirname + "../../../dependencies/html/index.html")
    ))
      .toString()
      .replace(/%cdnUrl%/g, cdnUrl.toString())
      .replace(/%debug%/g, debug)
      .replace(/%firebug%/g, firebugLink)
      .replace(/%interfaceUrl%/g, interfaceUrl)
      .replace(/%soldierId%/g, req.session.soldier.id.toString())
      .replace(/%soldierName%/g, req.session.soldier.soldierName)
      .replace(/%level%/g, req.session.soldier.level.toString())
      .replace(/%funds%/g, wallet._PF.toString())
      .replace(/%credits%/g, wallet._AC.toString())
      .replace(/%lastAuthed%/g, lastAuthed.toString())
      .replace(/%timeNow%/g, timeNow.toString())
      .replace(/%numberOfTrainingPointsPurchased%/g, maxNumberOfExtraPoints)
      .replace(/%maxNumberOfExtraPoints%/g, numberOfTrainingPointsPurchased)
      .replace(/%trainingPointsOffers%/g, JSON.stringify(offersJson))
      .replace(/%personaJson%/g, JSON.stringify(personaJson))
      .replace(/%personasJson%/g, JSON.stringify(personasJson));

    return res.type("text/html").send(html);
  } catch (err) {
    Logger.log("error", "HtmlControllerError", { message: err });
    return res.code(401).send("Uh oh, something went wrong!");
  }
};

export default async fastify => {
  fastify.route({
    method: "GET",
    url: "/",
    handler: htmlHandler
  });
};
