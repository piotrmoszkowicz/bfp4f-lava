import Hero from "../models/hero";
import Wallet from "../models/wallet";

const WalletService = {
  getWalletBySessionId(sessionId: string) {
    return Wallet.findAll({
      include: [
        {
          attributes: [],
          model: Hero,
          where: {
            sessionId
          }
        }
      ]
    });
  }
};

export default WalletService;