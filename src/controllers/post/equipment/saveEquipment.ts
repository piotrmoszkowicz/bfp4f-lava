import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";

import Logger from "../../../util/logger";

import ItemService from "../../../services/itemService";

export const saveEquipment = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  if (!req.body || !req.body.equipment) {
    return res.json({
      status: "error"
    });
  }

  const newEquipmentBar = JSON.parse(req.body.equipment) || [];

  try {
    await ItemService.equipWholeBar(req.session.soldierId, newEquipmentBar);
    return res.json({
      status: "success"
    });
  } catch (err) {
    Logger.error("Error in /saveEquipment", err);
    return res.json({
      status: "error"
    });
  }
};
