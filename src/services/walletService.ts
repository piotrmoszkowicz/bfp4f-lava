import User from "../models/user";
import Wallet from "../models/wallet";

import { WalletBalance } from "WalletBalance";

const WalletService = {
  getWalletBySessionId(sessionId: string) {
    return Wallet.findAll({
      include: [
        {
          attributes: [],
          model: User,
          where: {
            sessionId
          }
        }
      ]
    });
  },

  parseWallet(wallet: Wallet[]) {
    return wallet.reduce<WalletBalance>(
      (convertedWallet, singleWallet) => {
        convertedWallet[singleWallet.currency] = singleWallet.value;
        return convertedWallet;
      },
      {
        _PF: 0,
        _AC: 0
      }
    );
  }
};

export default WalletService;
