import { Response } from "express";
import { RequestBFP4F } from "ExpressOverride";
import { PurchaseTrainingPoints } from "PurchaseTrainingPoints";
import Wallet from "wallet";
import WalletService from "../../../services/walletService";

import { WalletBalance } from "WalletBalance";

import Logger from "../../../util/logger";

export const purchaseTrainingPoints = async (
  req: RequestBFP4F,
  res: Response
): Promise<Response> => {
  const wallet: Wallet[] = await WalletService.getWalletBySessionId(
    req.sessionId
  );
  // TODO: Make buy
  // TODO: Save wallets

  const finalWallet = wallet.reduce<WalletBalance>(
    (convertedWallet, singleWallet) => {
      convertedWallet[singleWallet.currency] = singleWallet.value;
      return convertedWallet;
    },
    {
      _PF: 0,
      _AC: 0
    }
  );

  try {
    return res.json({
      result: "success",
      status: "success",
      data: {
        credits: finalWallet._AC,
        funds: finalWallet._PF,
        purchasedPoints: 0,
        trainingPoints: 0,
        offers: []
      }
    } as PurchaseTrainingPoints);
  } catch (err) {
    Logger.error("Error in /abilities/purchaseTrainingPoints", err);
    return res.json({
      status: "error"
    });
  }
};
