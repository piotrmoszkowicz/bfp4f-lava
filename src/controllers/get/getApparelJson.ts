import ItemService from "@services/itemService";
import Logger from "@util/logger";

import { ApparelJsonResponse } from "ApparelJson";

export const getApparelJson = async (
  req,
  res
): Promise<ApparelJsonResponse> => {
  try {
    return {
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        apparel: await ItemService.getApparelJson(
          req.session.soldier.id,
          req.session.soldier.level
        ),
      },
    };
  } catch (err) {
    Logger.log("error", "Error in /getApparelJson", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error",
    });
  }
};
