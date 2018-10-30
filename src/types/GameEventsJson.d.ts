interface GameEventsJsonResponse {
  result: string;
  status: string;
  data: {
    status: string;
    unlockInfo: any[];
  };
}

export { GameEventsJsonResponse };
