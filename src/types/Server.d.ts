interface ServerJson {
  [id: string]: {
    gameId: number;
    persistentId: string;
    name: string;
    mapList: string[];
    roundsPerMap: string;
    currentRound: string;
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
  };
}

export { ServerJson };
