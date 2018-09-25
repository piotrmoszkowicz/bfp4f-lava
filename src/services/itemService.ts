import Item from "../models/item";
import OwnedItem from "../models/ownedItem";

const ItemService = {
  getOwnedItemsBySessionId(sessionId: string, type) {
    return Item.findAll({
      include: [
        {
          model: OwnedItem
        }
      ],
      where: {
        type
      }
    });
  }
};

export default ItemService;
