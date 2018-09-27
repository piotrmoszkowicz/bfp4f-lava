import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";
import Wallet from "wallet";
import WalletService from "../../services/walletService";

import { WalletBalance, WalletBalanceResponse } from "WalletBalance";

import Logger from "../../util/logger";

export const getWalletBalance = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  try {
    const wallet: Wallet[] = await WalletService.getWalletBySessionId(
      req.sessionId
    );
    return res.json({
      data: wallet.reduce<WalletBalance>(
        (convertedWallet, singleWallet) => {
          convertedWallet[singleWallet.currency] = singleWallet.value;
          return convertedWallet;
        },
        {
          _PF: 0,
          _AC: 0
        }
      ),
      status: "success"
    } as WalletBalanceResponse);
  } catch (err) {
    Logger.error("Error in /getWalletBalance", err);
    return res.json({
      status: "error"
    });
  }
};
