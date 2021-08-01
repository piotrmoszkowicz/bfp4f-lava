import ItemService from "@services/itemService";
import Logger from "@util/logger";

import { WeaponsJsonResponse } from "WeaponsJson";

export const getWeaponsJson = async (
  req,
  res
): Promise<WeaponsJsonResponse> => {
  try {
    const { id, level, kit } = req.session.soldier;

    return {
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        weapons: await ItemService.getWeaponsJson(id, level, kit),
      },
    };
  } catch (err) {
    Logger.log("error", "Error in /getWeaponsJson", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error",
    });
  }
};
