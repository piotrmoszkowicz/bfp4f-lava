import { Router } from "express";

import { postStoreBuy } from "./buy";

const router: Router = Router();

router.post("/store/buy/:soldierId/:offerId", postStoreBuy);

export { router as StorePostRoutes };
