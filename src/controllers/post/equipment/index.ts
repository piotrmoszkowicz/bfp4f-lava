import { Router } from "express";

import { saveEquipment } from "./saveEquipment";

const router: Router = Router();

router.post("/saveEquipmentBar/:soldierId", saveEquipment);

export { router as EquipmentPostRoutes };
