import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";
import { WeaponsJson, WeaponsJsonResponse } from "WeaponsJson";

import ItemService from "../../services/itemService";

import Logger from "../../util/logger";

export const getWeaponsJson = async (req: RequestBFP4F, res: Response): Promise<Response> => {
  try {
    const weapons = await ItemService.getOwnedItemsBySessionId(
      req.sessionId,
      "weapons"
    );

    return res.json({
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        weapons: weapons.map<WeaponsJson>(weapon => {
          let expireTS: boolean | number = false;
          let expired = true;
          let buyable = true;

          if (weapon.ownerData.createdAt !== null) {
            expireTS = (weapon.ownerData.availableTill === null) ? false : +new Date(weapon.ownerData.availableTill);
            expired = !(expireTS === false || expireTS > +new Date());
            buyable = weapon.buyable && expired;
          }

          return {
            id: weapon.id,
            type: weapon.type,
            name: weapon.name,
            category: weapon.category,
            categoryname: weapon.category.charAt(0).toUpperCase()
              + weapon.category.substr(1).replace(/_/g, " "),
            usecount: weapon.ownerData.useCount,
            isnew: false,
            expiredate: weapon.ownerData.availableTill || "",
            expireTS,
            expired,
            description: weapon.description,
            owned: !expired,
            ownedPermanent: !(!!expireTS),
            buyable,
            equippedSlot: null, // TODO: Add EQ from DB
            validationGroup: weapon.category,
            prices: [], // TODO: Probably needs fix?
            promotionType: null,
            isLocked: false, // TODO: Fix, check via level and lock
            stats: [], // TODO Add stats to DB
            attachments: []
          };
        })
      }
    } as WeaponsJsonResponse);
  } catch (err) {
    Logger.error("Error in /getWeaponsJson", err);
    return res.json({
      status: "error"
    });
  }
};
