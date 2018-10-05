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
    return OwnedItem.findOne({
      where: {
        ownerId,
        itemId
      }
    }).then(item => {
      item.barPosition = slot;
      return item.save();
    });
  }
};

export default ItemService;
