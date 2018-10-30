import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";
import { SoldierJson, SoldiersJsonResponse } from "SoldiersJson";

import SoldierService from "../../services/soldierService";

import Logger from "../../util/logger";

export const getSoldiers = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    const soldiers = await SoldierService.getSoldiersBySessionId(req.sessionId);
    return res.json({
      result: "success",
      status: "success",
      data: {
        personas: soldiers.map(soldier => ({
          id: soldier.id,
          name: soldier.soldierName,
          kit: soldier.kit,
          xp: 0, // TODO: Add XP
          xpForNextLevel: 0, // TODO: Add XP for nextLevel
          lastAuthenticated: 0, // TODO: Add lastAuthed
          mugShot: "", // TODO: Add mugshots
          isMaxLevel: !!(soldier.level === 30),
          level: soldier.level,
          levelUpProgression: 0, // TODO: Add level progression
          levelDescription: "Asdf" // TODO: Add level descriptions
        }) as SoldierJson)
      }
    } as SoldiersJsonResponse);
  } catch (err) {
    Logger.error("Error in /getSoldiers", err);
    return res.json({
      status: "error"
    });
  }
};
