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
  }
};

export default ItemService;
