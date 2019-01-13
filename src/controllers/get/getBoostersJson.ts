import { BoostersJson, BoostersJsonResponse } from "BoostersJson";
import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";

import ItemService from "../../services/itemService";

import Logger from "../../util/logger";

export const getBoostersJson = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    const boosters = await ItemService.getOwnedItemsBySoldierId(
      req.session.soldier.id,
      ["boosters"]
    );

    return res.json({
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        boosters: boosters.map<BoostersJson>((booster, key) => {
          let expireTS: boolean | number = false;
          let expired = true;
          let buyable = true;

          if (booster.ownerData.createdAt !== null) {
            expireTS =
              booster.ownerData.availableTill === null
                ? false
                : +new Date(booster.ownerData.availableTill);
            expired = !(expireTS === false || expireTS > +new Date());
            buyable = booster.buyable && expired;
          }

          const isLocked = booster.lockCriteria > req.session.soldier.level;

          Logger.info(booster.offers);

          return {
            id: booster.id,
            type: booster.type,
            name: booster.name,
            category: booster.category,
            categoryname:
              booster.category.charAt(0).toUpperCase() +
              booster.category.substr(1).replace(/_/g, " "),
            usecount: booster.ownerData.useCount,
            isnew: false,
            expiredate: booster.ownerData.availableTill || "",
            expireTS,
            expired,
            description: booster.description,
            owned: !expired,
            ownedPermanent: !!!expireTS,
            buyable,
            equippedSlot: key,
            validationGroup: booster.category,
            prices: buyable
              ? booster.offers.map(offer => ({
                  offer: offer.id,
                  limit: offer.limit,
                  isUnlimited: offer.isUnlimited,
                  currency: offer.currency,
                  cost: offer.cost,
                  isUnlockOffer: offer.isUnlockOffer
                }))
              : [], // TODO: check what offers make sense - isUnlockOffer / isLocked stuff
            promotionType: null,
            isLocked
          };
        })
      }
    } as BoostersJsonResponse);
  } catch (err) {
    Logger.error("Error in /getBoostersJson", err);
    return res.json({
      status: "error"
    });
  }
};
