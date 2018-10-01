import User from "../models/user";
import Wallet from "../models/wallet";

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
  }
};

export default WalletService;
