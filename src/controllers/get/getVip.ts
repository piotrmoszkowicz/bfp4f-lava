import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";

import Logger from "../../util/logger";

export const getVip = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    return res.json({
      result: "success",
      status: "success",
      data: {
        vip: []
      }
    });
  } catch (err) {
    Logger.error("Error in /getVip", err);
    return res.json({
      status: "error"
    });
  }
};
