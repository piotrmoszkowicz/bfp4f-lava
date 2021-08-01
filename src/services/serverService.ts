import Server from "@models/server";

const ServerService = {
  /**
   * Function which grabs all online server from DB
   */
  getAllServers() {
    return Server.findAll({
      where: {
        online: true,
      },
    });
  },

  /**
   * Function which retrives formatted servers JSON response
   */
  getServersJson() {
    return this.getAllServers().then(this.parseServersForResponse);
  },

  /**
   * Function, which parses server for interface
   * @param servers     - JSON of servers
   */
  parseServersForResponse(servers) {
    return servers.reduce((serverlist, server) => {
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
          nextMap:
            server.currentMap + 1 > maplist.length
              ? maplist[server.currentMap + 1].split(":")[0]
              : maplist[0].split(":")[0],
          nextGameMode:
            server.currentMap + 1 > maplist.length
              ? maplist[server.currentMap + 1].split(":")[1]
              : maplist[0].split(":")[1],
        },
      };
      return {
        ...serverlist,
        ...newServer,
      };
    }, {} as any); // TODO: Type that somehow
  },
};

export default ServerService;
