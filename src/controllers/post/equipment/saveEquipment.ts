import Logger from "@util/logger";

import ItemService from "@services/itemService";

export const saveEquipment = async (req, res): Promise<any> => {
  const newEquipmentBar = JSON.parse(req.body.equipment) || [];

  try {
    await ItemService.equipWholeBar(req.session.soldier.id, newEquipmentBar);
    return {
      status: "success"
    };
  } catch (err) {
    Logger.log("error", "Error in /equipment/saveEquipment", { message: err });
    return res.code(406).send({
      status: "error"
    });
  }
};
