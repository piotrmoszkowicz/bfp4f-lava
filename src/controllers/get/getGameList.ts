import { GameListJsonResponse } from "GameListJson";

import ServerService from "@services/serverService";

import Logger from "@util/logger";

export const getGameList = async (req, res): Promise<GameListJsonResponse> => {
  try {
    return {
      result: "success",
      status: "success",
      data: await ServerService.getServersJson()
    };
  } catch (err) {
    Logger.log("error", "Error in /getGameList", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error"
    });
  }
};
