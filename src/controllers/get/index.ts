import { Router } from "express";

import { getWalletBalance } from "./getWalletBalance";
import { getWeaponsJson } from "./getWeaponsJson";

const router: Router = Router();

router.get("/getWalletBalance", getWalletBalance);
router.get("/getWeaponsJson", getWeaponsJson);

export { router as GetRoutes };
