import { Router } from "express";

import { AbilitiesPostRoutes } from "./abilities";
import { EquipmentPostRoutes } from "./equipment";
import { StorePostRoutes } from "./store";

const router: Router = Router();

router.use(AbilitiesPostRoutes);
router.use(EquipmentPostRoutes);
router.use(StorePostRoutes);

export { router as PostRoutes };
