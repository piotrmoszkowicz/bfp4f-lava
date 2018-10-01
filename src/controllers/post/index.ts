import { Router } from "express";

import { StorePostRoutes } from "./store";

const router: Router = Router();

router.use(StorePostRoutes);

export { router as PostRoutes };
