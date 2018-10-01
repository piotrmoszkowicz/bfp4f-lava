import { ApparelJson, ApparelJsonResponse } from "ApparelJson";
import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";

import ItemService from "../../services/itemService";
import SoldierService from "../../services/soldierService";

import Logger from "../../util/logger";

export const getApparelJson = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    const apparels = await ItemService.getOwnedItemsBySessionId(
      req.sessionId,
      "appearance"
    );

    const hero = await SoldierService.getSoldierByID(req.soldierId, ["level"]);

    return res.json({
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        apparel: apparels.map<ApparelJson>(apparel => {
          let expireTS: boolean | number = false;
          let expired = true;
          let buyable = true;

          if (apparel.ownerData.createdAt !== null) {
            expireTS =
              apparel.ownerData.availableTill === null
                ? false
                : +new Date(apparel.ownerData.availableTill);
            expired = !(expireTS === false || expireTS > +new Date());
            buyable = apparel.buyable && expired;
          }

          const isLocked = apparel.lockCriteria > hero.level;

          Logger.info(apparel.offers);

          return {
            id: apparel.id,
            type: apparel.type,
            name: apparel.name,
            category: apparel.category,
            categoryname:
              apparel.category.charAt(0).toUpperCase() +
              apparel.category.substr(1).replace(/_/g, " "),
            usecount: apparel.ownerData.useCount,
            isnew: false,
            expiredate: apparel.ownerData.availableTill || "",
            expireTS,
            expired,
            description: apparel.description,
            owned: !expired,
            ownedPermanent: !!!expireTS,
            buyable,
            equippedSlot: null, // TODO: Add EQ from DB
            validationGroup: apparel.category,
            prices: buyable
              ? apparel.offers.map(offer => ({
                  offer: offer.id,
                  limit: offer.limit,
                  isUnlimited: offer.isUnlimited,
                  currency: offer.currency,
                  cost: offer.cost,
                  isUnlockOffer: offer.isUnlockOffer
                }))
              : [], // TODO: check what offers make sense - isUnlockOffer / isLocked stuff
            promotionType: null,
            isLocked,
            lockType: "level",
            lockCriteria: apparel.lockCriteria,
            numberOfPockets: 0,
            minNumPockets: 0,
            maxNumPockets: 0,
            upgrades: []
          };
        })
      }
    } as ApparelJsonResponse);
  } catch (err) {
    Logger.error("Error in /getApparelJson", err);
    return res.json({
      status: "error"
    });
  }
};
