import { SoldiersJsonResponse } from "SoldiersJson";

import SoldierService from "@services/soldierService";

import Logger from "@util/logger";

export const getSoldiers = async (req, res): Promise<SoldiersJsonResponse> => {
  try {
    return {
      result: "success",
      status: "success",
      data: {
        personas: await SoldierService.getFormattedSoldiersBySessionId(
          req.sessionId
        )
      }
    };
  } catch (err) {
    Logger.log("error", "Error in /getSoldiers", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error"
    });
  }
};
