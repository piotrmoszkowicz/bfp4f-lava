interface WalletBalance {
  _PF: number;
  _AC: number;
}

interface WalletBalanceResponse {
  data?: WalletBalance;
  status: string;
}

export { WalletBalance, WalletBalanceResponse };
