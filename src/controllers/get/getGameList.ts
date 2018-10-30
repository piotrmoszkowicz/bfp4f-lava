import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";
import { GameListJsonResponse } from "GameListJson";

import ServerService from "../../services/serverService";

import Logger from "../../util/logger";

export const getGameList = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    const serverlist = await ServerService.getAllServers();
    return res.json({
      result: "success",
      status: "success",
      data: ServerService.parseServersForResponse(serverlist)
    } as GameListJsonResponse);
  } catch (err) {
    Logger.error("Error in /getGameList", err);
    return res.json({
      result: "error",
      status: "error"
    });
  }
};
