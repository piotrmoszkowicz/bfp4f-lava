import { Router } from "express";

import { RequestBFP4F } from "ExpressOverride";

import { getApparelJson } from "./getApparelJson";
import { getAttachmentsJson } from "./getAttachmentsJson";
import { getBoostersJson } from "./getBoostersJson";
import { getBundlesJson } from "./getBundlesJson";
import { getGameList } from "./getGameList";
import { getSoldiers } from "./getSoldiers";
import { getVip } from "./getVip";
import { getWalletBalance } from "./getWalletBalance";
import { getWeaponsJson } from "./getWeaponsJson";

const router: Router = Router();

router.get("/getApparelJson", getApparelJson);
router.get("/getAttachmentsJson", getAttachmentsJson);
router.get("/getBundlesJson", getBundlesJson);
router.get("/getBoostersJson", getBoostersJson);
router.get("/getGameList", getGameList);
router.get("/getSoldiers", getSoldiers);
router.get("/getVip", getVip);
router.get("/getWalletBalance", getWalletBalance);
router.get("/getWeaponsJson", getWeaponsJson);

export { router as GetRoutes };
