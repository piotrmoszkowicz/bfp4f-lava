import { Router } from "express";

import { purchaseTrainingPoints } from "./purchaseTrainingPoints";

const router: Router = Router();

router.post("/purchaseTrainingPoints/personaId/:personaId/offerId/:offerId", purchaseTrainingPoints);

export { router as AbilitiesPostRoutes };
