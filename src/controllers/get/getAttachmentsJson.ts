import Logger from "@util/logger";

import { AttachmentJsonResponse } from "AttachmentJson";

export const getAttachmentsJson = async (req, res): Promise<any> => {
  try {
    return {
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        attachments: []
      }
    } as AttachmentJsonResponse;
  } catch (err) {
    Logger.log("error", "Error in /getAttachmentsJson", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error"
    });
  }
};
