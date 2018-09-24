import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";

import Hero from "../models/hero";

/**
 * GET /api
 * List of API examples.
 */
export const getApi = (req: RequestBFP4F, res: Response) => {
  res.json({
    sessionId: req.sessionId
  });
  /*Hero.findAll().then(heroes => {
    res.json(heroes);
  });*/
};
