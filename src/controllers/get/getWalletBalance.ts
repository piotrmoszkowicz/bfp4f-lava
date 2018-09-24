import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";
import Wallet from "wallet";
import WalletService from "../../services/walletService";

import Logger from "../../util/logger";

export const getWalletBalance = async (req: RequestBFP4F, res: Response) => {
  try {
    const wallet: Wallet[] = await WalletService.getWalletBySessionId(req.sessionId);
    return res.json({
      data: wallet.reduce((convertedWallet, singleWallet) => {
        convertedWallet[singleWallet.currency] = singleWallet.value;
        return convertedWallet;
      }, {}),
      status: "success"
    });
  } catch (err) {
    Logger.error("Error in /getWalletBalance", err);
    return res.json({
      status: "error"
    });
  }
};