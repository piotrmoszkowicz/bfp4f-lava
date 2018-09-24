import { Router } from "express";

import { GetRoutes } from "./get";
import { OptionRoutes } from "./options";
import { PostRoutes } from "./post";

const router: Router = Router();

router.use(GetRoutes);
router.use(OptionRoutes);
router.use(PostRoutes);

export const GameRouter: Router = router;
