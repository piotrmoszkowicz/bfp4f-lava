import { Request, Response } from "express";
import database from "../database";

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  return res.json({
    hello: "world"
  });
};
