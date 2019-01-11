import Soldier from "../models/soldier";

import userService from "./userService";

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
      attributes: attributes ? attributes : ["*"],
      where: {
        id
      }
    };
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
  }
};

export default SoldierService;
