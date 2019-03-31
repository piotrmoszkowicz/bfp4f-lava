import { Sequelize } from "sequelize-typescript";

import Item from "@models/item";
import Offer from "@models/offer";
import OwnedItem from "@models/ownedItem";

import { ApparelJson } from "ApparelJson";
import { BoostersJson } from "BoostersJson";
import { WeaponsJson } from "WeaponsJson";

const ItemService = {
  /**
   * Functions which grabs all items that certain soldier owns
   * @param soldierId     - ID of Soldier
   * @param types         - Type of items
   * @param kitId         - Kit of Soldier
   */
  getOwnedItemsBySoldierId(soldierId: number, types: string[], kitId?: number) {
    const kitParams = [-1];
    if (kitId !== undefined) {
      kitParams.push(kitId);
    }
    return Item.findAll({
      include: [
        {
          model: OwnedItem,
          where: {
            ownerId: soldierId
          },
          required: false
        },
        {
          model: Offer
        }
      ],
      where: {
        type: {
          [Sequelize.Op.or]: types
        },
        kit: {
          [Sequelize.Op.or]: kitParams
        }
      }
    });
  },

  /**
   * Function which returns all apparel data formatted for JSON response
   * @param soldierId      -  ID of Soldier
   * @param soldierLevel   -  Level of soldier
   */
  getApparelJson(soldierId: number, soldierLevel: number) {
    return this.getOwnedItemsBySoldierId(soldierId, ["appearance"]).then(data =>
      this.formatApparelJson(data, soldierLevel)
    );
  },

  /**
   * Function which returns all boosters data formatted for JSON response
   * @param soldierId      -  ID of Soldier
   * @param soldierLevel   -  Level of soldier
   */
  getBoostersJson(soldierId: number, soldierLevel: number) {
    return this.getOwnedItemsBySoldierId(soldierId, ["boosters"]).then(data =>
      this.formatBoostersJson(data, soldierLevel)
    );
  },

  /**
   * Function which returns all boosters data formatted for JSON response
   * @param soldierId      -  ID of Soldier
   * @param soldierLevel   -  Level of soldier
   * @param kitId          -  ID of Soldier's kit
   */
  getWeaponsJson(soldierId: number, soldierLevel: number, kitId: number) {
    return this.getOwnedItemsBySoldierId(
      soldierId,
      ["abilities", "weapons"],
      kitId
    ).then(data => this.formatWeaponsJson(data, soldierLevel));
  },

  /**
   * Functions, which equipps single item for certain soldier
   * @param ownerId      - ID of Soldier
   * @param itemId       - ID of Item
   * @param slot         - Slot to equip to
   */
  equipItem(ownerId: number, itemId: number, slot: number) {
    return OwnedItem.unscoped()
      .findOne({
        where: {
          ownerId,
          itemId
        }
      })
      .then(item => {
        if (!item) {
          return;
        }
        item.barPosition = slot;
        return item.save();
      });
  },

  /**
   * Functions, which deequips all items besides ones to equip
   * @param ownerId         - ID of Soldier
   * @param itemsToEquip    - Items, which won't be deequipped
   */
  deequipAllItems(ownerId: number, itemsToEquip: number[]) {
    return OwnedItem.unscoped()
      .findAll({
        where: {
          ownerId,
          barPosition: {
            [Sequelize.Op.ne]: -1
          }
        }
      })
      .then(items => {
        return items.forEach(item => {
          if (itemsToEquip.includes(item.itemId)) {
            return;
          }
          item.barPosition = -1;
          return item.save();
        });
      });
  },

  /**
   * Function, which equipps whole bar in a single call
   * @param ownerId         - Soldier ID
   * @param items           - Array of items to equip
   */
  equipWholeBar(ownerId: number, items: number[]) {
    return this.deequipAllItems(ownerId, items).then(() => {
      return items.forEach((itemId, key) => {
        if (itemId === 0) {
          return;
        }
        return this.equipItem(ownerId, itemId, key);
      });
    });
  },

  /**
   * Function, which formats apparel items into valid JSON response
   * @param apparelData      -  Array of apparel data from database
   * @param soldierLevel     -  Level of current soldier
   */
  formatApparelJson(apparelData: any[], soldierLevel: number) {
    return apparelData.map<ApparelJson>(apparel => {
      let expireTS: boolean | number = false;
      let expired = true;
      let buyable = true;

      // TODO: Refactor - move to separate function
      if (apparel.ownerData.createdAt !== null) {
        expireTS =
          apparel.ownerData.availableTill === null
            ? false
            : +new Date(apparel.ownerData.availableTill);
        expired = !(expireTS === false || expireTS > +new Date());
        buyable = apparel.buyable && expired;
      }

      const isLocked = apparel.lockCriteria > soldierLevel;

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
    });
  },

  /**
   * Function, which formats boosters into valid JSON response
   * @param boostersData     -  Array of boosters data from database
   * @param soldierLevel     -  Level of current soldier
   */
  formatBoostersJson(boostersData: any[], soldierLevel: number) {
    return boostersData.map<BoostersJson>((booster, key) => {
      let expireTS: boolean | number = false;
      let expired = true;
      let buyable = true;

      // TODO: Refactor - move to separate function
      if (booster.ownerData.createdAt !== null) {
        expireTS =
          booster.ownerData.availableTill === null
            ? false
            : +new Date(booster.ownerData.availableTill);
        expired = !(expireTS === false || expireTS > +new Date());
        buyable = booster.buyable && expired;
      }

      const isLocked = booster.lockCriteria > soldierLevel;

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
    });
  },

  /**
   * Function, which formats weapons into valid JSON response
   * @param weaponsData      -  Array of weapons data from database
   * @param soldierLevel     -  Level of current soldier
   */
  formatWeaponsJson(weaponsData: any[], soldierLevel: number) {
    return weaponsData
      .map<WeaponsJson>(weapon => {
        let expireTS: boolean | number = false;
        let expired = true;
        let buyable = true;

        // TODO: Refactor - move to separate function
        if (weapon.ownerData.createdAt !== null) {
          expireTS =
            weapon.ownerData.availableTill === null
              ? false
              : +new Date(weapon.ownerData.availableTill);
          expired = !(expireTS === false || expireTS > +new Date());
          buyable = weapon.buyable && expired;
        }

        const isLocked = expired ? weapon.lockCriteria > soldierLevel : false;

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
      .filter(responseItem => responseItem !== null);
  }
};

export default ItemService;
