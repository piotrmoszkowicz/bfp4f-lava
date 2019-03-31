import { GameEventsJsonResponse } from "GameEventsJson";

import Logger from "@util/logger";

export const getGameEvents = async (
  req,
  res
): Promise<GameEventsJsonResponse> => {
  try {
    return {
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        unlockInfo: []
      }
    };
  } catch (err) {
    Logger.log("error", "Error in /getGameEvents", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error"
    });
  }
};
