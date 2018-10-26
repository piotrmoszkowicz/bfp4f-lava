import Soldier from "../models/soldier";

// import userService from "./userService";

const SoldierService = {
  getSoldiersBySessionId(sessionId: string) {
    // return userService.getUserIdFromSessionId(sessionId).then(userId => this.getSoldiersByUserId(userId));
    return this.getSoldiersByUserId(666)
  },

  getMainSoldierIdBySessionId(sessionId: string) {
    /* return userService.getUserIdFromSessionId(sessionId).then(userId => {
      return this.getMainSoldierIdByUserId(userId);
    }); */
    return this.getMainSoldierIdByUserId(666);
  },
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

  getSoldierByID(id: number, attributes?: string[]) {
    const opts = {
      attributes: attributes ? attributes : ["*"],
      where: {
        id
      }
    };
    return Soldier.findOne(opts);
  },

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
