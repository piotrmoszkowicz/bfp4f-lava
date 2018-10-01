import { Router } from "express";

import { getApparelJson } from "./getApparelJson";
import { getWalletBalance } from "./getWalletBalance";
import { getWeaponsJson } from "./getWeaponsJson";

const router: Router = Router();

router.get("/getApparelJson", getApparelJson);
router.get("/getWalletBalance", getWalletBalance);
router.get("/getWeaponsJson", getWeaponsJson);

export { router as GetRoutes };
