import { Request, Response } from "express";

import Hero from "../models/hero";

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  Hero.findAll().then(heroes => {
    res.json(heroes);
  });
};
