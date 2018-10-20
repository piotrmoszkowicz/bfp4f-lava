import { Sequelize } from "sequelize-typescript";

import Item from "../models/item";
import Offer from "../models/offer";
import OwnedItem from "../models/ownedItem";

const ItemService = {
  getOwnedItemsBySessionId(sessionId: string, type) {
    return Item.findAll({
      include: [
        {
          model: OwnedItem
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

  equipItem(ownerId: number, itemId: number, slot: number) {
    return OwnedItem.unscoped().findOne({
      where: {
        ownerId,
        itemId
      }
    }).then(item => {
      item.barPosition = slot;
      return item.save();
    });
  },

  deequipAllItems(ownerId: number, itemsToEquip: number[]) {
    return OwnedItem.unscoped().findAll({
      where: {
        ownerId,
        barPosition: {
          [Sequelize.Op.ne]: -1
        }
      }
    }).then(items => {
      return items.forEach(item => {
        if (itemsToEquip.includes(item.itemId)) {
          return;
        }
        item.barPosition = -1;
        return item.save();
      })
    })
  },

  equipWholeBar(ownerId: number, items: number[]) {
    return this.deequipAllItems(ownerId, items)
      .then(() => {
        return items
          .forEach((itemId, key) => {
            if (itemId === 0) {
              return;
            }
            return this.equipItem(ownerId, itemId, key);
          })
      })
  }
};

export default ItemService;
