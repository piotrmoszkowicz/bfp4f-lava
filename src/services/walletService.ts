import Wallet from "../models/wallet";

// import userService from "./userService";

import { WalletBalance } from "WalletBalance";

const WalletService = {
  /**
   * Gets wallet for certain user by UserID
   * @param userId          - UserID
   */
  getWalletByUserId(userId: number) {
    return Wallet.findAll({
      where: {
        userId
      }
    });
  },

  /**
   * Gets wallet by sessionID
   * @param sessionId     - SessionID
   */
  getWalletBySessionId(sessionId: string) {
    // return userService.getUserIdFromSessionId(sessionId).then(userId => this.getWalletByUserId(userId));
    return this.getWalletByUserId(666);
  },

  /**
   * Parses wallet DB response
   * @param wallet      - DB Wallet rows
   */
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
