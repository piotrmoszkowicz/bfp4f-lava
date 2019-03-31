import { BoostersJsonResponse } from "BoostersJson";

import ItemService from "@services/itemService";
import Logger from "@util/logger";

export const getBoostersJson = async (req, res): Promise<any> => {
  try {
    return {
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        boosters: await ItemService.getBoostersJson(
          req.session.soldier.id,
          req.session.soldier.level
        )
      }
    } as BoostersJsonResponse;
  } catch (err) {
    Logger.log("error", "Error in /getBoostersJson", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error"
    });
  }
};
