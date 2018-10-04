import { Router } from "express";

import { AbilitiesPostRoutes } from "./abilities";
import { StorePostRoutes } from "./store";

const router: Router = Router();

router.use(AbilitiesPostRoutes);
router.use(StorePostRoutes);

export { router as PostRoutes };
