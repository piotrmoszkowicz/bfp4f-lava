import WalletService from "@services/walletService";
import Logger from "@util/logger";

import { BuyJsonResponse } from "BuyJson";
import Wallet from "wallet";
import { WalletBalance } from "WalletBalance";

export const postStoreBuy = async (req, res): Promise<BuyJsonResponse> => {
  const wallet: Wallet[] = await WalletService.getWalletBySessionId(
    req.session.sid
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
      _AC: 0,
    }
  );

  try {
    return {
      result: "success",
      status: "success",
      data: {
        credits: finalWallet._AC,
        funds: finalWallet._PF,
        items: [],
      },
    };
  } catch (err) {
    Logger.log("error", "Error in /store/buy", { message: err });
    return res.code(406).send({
      result: "error",
      status: "error",
    });
  }
};
