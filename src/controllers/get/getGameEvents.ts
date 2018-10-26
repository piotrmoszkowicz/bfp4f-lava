import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";

import Logger from "../../util/logger";

export const getGameEvents = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    return res.json({
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        unlockInfo: []
      }
    });
  } catch (err) {
    Logger.error("Error in /getGameEvents", err);
    return res.json({
      status: "error"
    });
  }
};
