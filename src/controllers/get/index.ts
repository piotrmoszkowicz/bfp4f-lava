import { Router } from "express";

import { getApparelJson } from "./getApparelJson";
import { getAttachmentsJson } from "./getAttachmentsJson";
import { getBoostersJson } from "./getBoostersJson";
import { getBundlesJson } from "./getBundlesJson";
import { getSoldiers } from "./getSoldiers";
import { getVip } from "./getVip";
import { getWalletBalance } from "./getWalletBalance";
import { getWeaponsJson } from "./getWeaponsJson";

import * as path from "path";

const router: Router = Router();

router.get("/", (req, res) => {
   res.sendFile(path.join(__dirname+"../../../../html/index.html"));
});
router.get("/getApparelJson", getApparelJson);
router.get("/getAttachmentsJson", getAttachmentsJson);
router.get("/getBundlesJson", getBundlesJson);
router.get("/getBoostersJson", getBoostersJson);
router.get("/getSoldiers", getSoldiers);
router.get("/getVip", getVip);
router.get("/getWalletBalance", getWalletBalance);
router.get("/getWeaponsJson", getWeaponsJson);

export { router as GetRoutes };
