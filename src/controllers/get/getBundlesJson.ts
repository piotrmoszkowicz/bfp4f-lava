import { BundlesJsonResponse } from "BundlesJson";

import Logger from "@util/logger";

export const getBundlesJson = async (req, res): Promise<any> => {
  try {
    return {
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        bundles: [],
      },
    } as BundlesJsonResponse;
  } catch (err) {
    Logger.log("error", "Error in /getBundlesJson", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error",
    });
  }
};
