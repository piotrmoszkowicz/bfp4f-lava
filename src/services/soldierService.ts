import Soldier from "../models/soldier";
import User from "../models/user";

const SoldierService = {
  getSoldiersBySessionId(sessionId: string, attributes?: string[]) {
    const opts = {
      include: [
        {
          model: User,
          where: {
            sessionId
          }
        }
      ]
    } as {
      attributes?: string[];
      include: any[];
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
  }
};

export default SoldierService;
