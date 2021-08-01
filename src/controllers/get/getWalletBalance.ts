import WalletService from "@services/walletService";
import Logger from "@util/logger";

import { WalletBalanceResponse } from "WalletBalance";

export const getWalletBalance = async (
  req,
  res
): Promise<WalletBalanceResponse> => {
  try {
    return {
      status: "success",
      data: WalletService.getWalletJsonBySessionId(req.sessionId),
    };
  } catch (err) {
    Logger.log("error", "Error in /getWalletBalance", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error",
    });
  }
};
