import { Request, Response } from "express";
import database from "../database";

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  database.query("SELECT * FROM game_heroes", { type: database.QueryTypes.SELECT})
    .then(users => {
      return res.json({
        hello: users
      });
    });

};
