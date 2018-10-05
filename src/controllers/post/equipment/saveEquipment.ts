import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";

import Logger from "../../../util/logger";

export const saveEquipment = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  if (!req.body || !req.body.data) {
    return res.json({
      status: "error"
    });
  }
  try {
    Logger.info(req.body);
    return res.json({
      result: "success"
    });
  } catch (err) {
    Logger.error("Error in /saveEquipment", err);
    return res.json({
      status: "error"
    });
  }
};
