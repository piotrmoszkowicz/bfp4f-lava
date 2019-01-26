import { Sequelize } from "sequelize-typescript";

import Item from "../models/item";
import Offer from "../models/offer";
import OwnedItem from "../models/ownedItem";

const ItemService = {
  /**
   * Functions which grabs all items that certain soldier owns
   * @param soldierId     - ID of Soldier
   * @param types         - Type of items
   * @param kitId         - Kit of Soldier
   */
  getOwnedItemsBySoldierId(soldierId: number, types: string[], kitId?: number) {
    const kitParams = [-1];
    if (kitId) {
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
  }
};

export default ItemService;
