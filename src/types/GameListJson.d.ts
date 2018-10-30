interface GameListJson {
  gameId: string;
  persistentId: string;
  name: string;
  mapList: string[];
  mapIndex: string;
  roundsPerMap: string;
  currentRounds: string;
  gameMode: string;
  ranked: boolean;
  hasPassword: boolean;
  players: string;
  capacity: string;
  pingSite: ServerRegion;
  ip: string;
  levelAvg: number;
  levelSdv: number;
  online: boolean;
  isVIP: boolean;
  bookmarked: boolean;
  currentMap: string;
  currentGameMode: string;
  nextMap: string;
  nextGameMode: string;
}

interface GameListJsonResponse {
  result: string;
  status: string;
  data: {
    [key: string]: GameListJson;
  };
}

export { GameListJson, GameListJsonResponse };
