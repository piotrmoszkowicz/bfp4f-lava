type WalletBalance = {
  _PF: number;
  _AC: number;
};

type WalletBalanceResponse = {
  data?: WalletBalance;
  status: string;
};

export { WalletBalance, WalletBalanceResponse };
