import { Router } from "express";

import { getWalletBalance } from "./getWalletBalance";

const router: Router = Router();

router.get("/getWalletBalance", getWalletBalance);

export {
  router as GetRoutes
};
