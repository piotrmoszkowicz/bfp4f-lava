import Soldier from "@models/soldier";
import userService from "@services/userService";

import { SoldierJson } from "SoldiersJson";

const SoldierService = {
  /**
   * Returns all soldiers, who belong to user by sessionId
   * @param sessionId       - SessionID of user
   */
  getSoldiersBySessionId(sessionId: string) {
    return userService
      .getUserIdFromSessionId(sessionId)
      .then(userId => this.getSoldiersByUserId(userId));
  },

  /**
   * Returns all soldiers, who belong to user by sessionId formatted into JSON response
   * @param sessionId       - SessionID of user
   */
  getFormattedSoldiersBySessionId(sessionId: string): Promise<SoldierJson[]> {
    return this.getSoldiersBySessionId(sessionId).then(this.formatSoldiersJson);
  },

  /**
   * Returns main soldier, who belongs to user by sessionId
   * @param sessionId       - SessionID of user
   */
  getMainSoldierIdBySessionId(sessionId: string) {
    return userService.getUserIdFromSessionId(sessionId).then(userId => {
      return this.getMainSoldierIdByUserId(userId);
    });
  },

  /**
   * Returns all soldiers by userId
   * @param userId          - UserID
   * @param attributes      - Attributes, which we want to get
   */
  getSoldiersByUserId(userId: number, attributes?: string[]) {
    const opts = {
      where: {
        userId
      }
    } as {
      attributes?: string[];
    };
    if (attributes) {
      opts.attributes = attributes;
    }
    return Soldier.findAll(opts);
  },

  /**
   * Gets single soldier by it's ID
   * @param id              - SoldierID
   * @param attributes      - Attributes, which we want to get
   */
  getSoldierByID(id: number, attributes?: string[]) {
    const opts = {
      where: {
        id
      }
    } as {
      attributes?: string[];
    };
    if (attributes) {
      opts.attributes = attributes;
    }
    return Soldier.findOne(opts);
  },

  /**
   * Gets ID of main soldier for certain user
   * @param userId          - UserID
   */
  getMainSoldierIdByUserId(userId: number) {
    const opts = {
      where: {
        isMain: true,
        userId
      }
    };
    return Soldier.findOne(opts);
  },

  /**
   * Function, which formats soldiers into valid JSON response
   * @param soldiersData     -  Array of soldiers data from database
   */
  formatSoldiersJson(soldiersData: any[]): SoldierJson[] {
    return soldiersData.map(
      soldier =>
        ({
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
        } as SoldierJson)
    );
  }
};

export default SoldierService;
