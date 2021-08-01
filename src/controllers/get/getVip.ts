import Logger from "@util/logger";

import { VipJsonResponse } from "VipJson";

export const getVip = async (req, res): Promise<VipJsonResponse> => {
  try {
    return {
      result: "success",
      status: "success",
      data: {
        vip: [],
      },
    };
  } catch (err) {
    Logger.log("error", "Error in /getVip", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error",
    });
  }
};
