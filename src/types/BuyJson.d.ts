interface BuyJsonResponse {
  result: string;
  status: string;
  data: {
    credits: number;
    funds: number;
    items: any[];
  };
}

export { BuyJsonResponse };
