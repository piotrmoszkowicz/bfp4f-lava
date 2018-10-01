import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";

import Logger from "../../util/logger";

export const getAttachmentsJson = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    return res.json({
      result: "success",
      status: "success",
      data: {
        status: "SUCCESS",
        attachments: []
      }
    });
  } catch (err) {
    Logger.error("Error in /getAttachmentsJson", err);
    return res.json({
      status: "error"
    });
  }
};