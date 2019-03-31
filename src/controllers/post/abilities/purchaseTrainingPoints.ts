import { PurchaseTrainingPoints } from "PurchaseTrainingPoints";
import Wallet from "wallet";

import WalletService from "@services/walletService";
import Logger from "@util/logger";

import { WalletBalance } from "WalletBalance";

export const purchaseTrainingPoints = async (
  req,
  res
): Promise<PurchaseTrainingPoints> => {
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
    return {
      result: "success",
      status: "success",
      data: {
        credits: finalWallet._AC,
        funds: finalWallet._PF,
        purchasedPoints: 0,
        trainingPoints: 0,
        offers: []
      }
    };
  } catch (err) {
    Logger.log("error", "Error in /abilities/purchaseTrainingPoint", { message: err });
    return res.code(406).send({
      status: "error"
    });
  }
};
