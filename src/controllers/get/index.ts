import { Router } from "express";

import { getApparelJson } from "./getApparelJson";
import { getAttachmentsJson } from "./getAttachmentsJson";
import { getBundlesJson } from "./getBundlesJson";
import { getBoostersJson } from "./getBoostersJson";
import { getWalletBalance } from "./getWalletBalance";
import { getWeaponsJson } from "./getWeaponsJson";

const router: Router = Router();

router.get("/getApparelJson", getApparelJson);
router.get("/getAttachmentsJson", getAttachmentsJson);
router.get("/getBundlesJson", getBundlesJson);
router.get("/getBoostersJson", getBoostersJson);
router.get("/getWalletBalance", getWalletBalance);
router.get("/getWeaponsJson", getWeaponsJson);

export { router as GetRoutes };
