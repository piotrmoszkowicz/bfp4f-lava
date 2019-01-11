import { Sequelize } from "sequelize-typescript";

import Item from "../models/item";
import Offer from "../models/offer";
import OwnedItem from "../models/ownedItem";

const ItemService = {
  /**
   * Functions which grabs all items that certain soldier owns
   * @param soldierId     - ID of Soldier
   * @param type          - Type of items
   */
  getOwnedItemsBySoldierId(soldierId: number, type: string) {
    return Item.findAll({
      include: [
        {
          model: OwnedItem,
          where: {
            ownerId: soldierId
          }
        },
        {
          model: Offer
        }
      ],
      where: {
        type
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
