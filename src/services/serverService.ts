import Server from "../models/server";

const ServerService = {
  getAllServers() {
    return Server.findAll({
      where: {
        online: true
      }
    });
  },

  parseServersForResponse(servers) {
    return servers.reduce(
      (serverlist, server) => {
        const maplist = JSON.parse(server.mapList);
        const newServer = {
          [server.id]: {
            gameId: server.id,
            persistentId: server.guid,
            name: server.name,
            mapList: maplist,
            roundsPerMap: server.roundsPerMap,
            currentRound: server.currentRound,
            gameMode: "",
            ranked: server.ranked,
            hasPassword: server.password.length > 0,
            players: server.numberOfCurrentPlayers.toString(),
            capacity: server.capacity.toString(),
            pingSite: server.region,
            ip: server.ip,
            levelAvg: 0,
            levelSdv: 0,
            online: server.online,
            isVIP: false, // TODO: Add VIP functionality
            bookmarked: false, // TODO: Add bookmark functionality
            currentMap: maplist[server.currentMap].split(":")[0],
            currentGameMode: maplist[server.currentMap].split(":")[1],
            nextMap: maplist[server.currentMap + 1].split(":")[0], // TODO: Fix when array length exceeds
            nextGameMode: maplist[server.currentMap + 1].split(":")[1] // TODO: Same as above
          }
        };
        return {
          ...serverlist,
          ...newServer
        };
      },
      {} as any
    ); // TODO: Type that somehow
  }
};

export default ServerService;
