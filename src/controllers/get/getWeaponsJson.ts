import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";
import { WeaponsJson, WeaponsJsonResponse } from "WeaponsJson";

import ItemService from "../../services/itemService";

import Logger from "../../util/logger";

export const getWeaponsJson = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    const weapons = await ItemService.getOwnedItemsBySoldierId(
      req.session.soldier.id,
      ["abilities", "weapons"],
      req.session.soldier.kit
    );

    return res.json({
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        weapons: weapons
          .map<WeaponsJson>(weapon => {
            let expireTS: boolean | number = false;
            let expired = true;
            let buyable = true;

            if (weapon.ownerData.createdAt !== null) {
              expireTS =
                weapon.ownerData.availableTill === null
                  ? false
                  : +new Date(weapon.ownerData.availableTill);
              expired = !(expireTS === false || expireTS > +new Date());
              buyable = weapon.buyable && expired;
            }

            const isLocked = expired
              ? weapon.lockCriteria > req.session.soldier.level
              : false;

            if (weapon.type.valueOf() === "abilities" && expired) {
              return null;
            }

            return {
              id: weapon.id,
              type: weapon.type,
              name: weapon.name,
              category: weapon.category,
              categoryname:
                weapon.category.charAt(0).toUpperCase() +
                weapon.category.substr(1).replace(/_/g, " "),
              usecount: weapon.ownerData.useCount,
              isnew: false,
              expiredate: weapon.ownerData.availableTill || "",
              expireTS,
              expired,
              description: weapon.description,
              owned: !expired,
              ownedPermanent: !expireTS,
              buyable,
              equippedSlot:
                weapon.ownerData.barPosition === -1
                  ? null
                  : weapon.ownerData.barPosition,
              validationGroup: weapon.validationGroup, // TODO: Not that one - it has to be primary/secondary/melee/gadget
              prices: buyable
                ? weapon.offers.map(offer => ({
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
              lockCriteria: weapon.lockCriteria,
              stats: weapon.stats,
              attachments: []
            };
          })
          .filter(responseItem => responseItem !== null)
      }
    } as WeaponsJsonResponse);
  } catch (err) {
    Logger.error("Error in /getWeaponsJson", err);
    return res.json({
      status: "error"
    });
  }
};
