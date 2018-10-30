interface VipJsonResponse {
  result: string;
  status: string;
  data: {
    vip: any[];
  };
}

export { VipJsonResponse };
