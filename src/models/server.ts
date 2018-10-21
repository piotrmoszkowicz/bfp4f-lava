import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "game_servers"
})
export default class Server extends Model<Server> {
  @Column
  public name: string;

  @Column
  public password: string;

  @Column
  public guid: string;

  @Column({
    type: DataType.ENUM("gva", "sjc", "iad", "nrt", "syd")
  })
  public region: ServerRegion;

  @Column({
    field: "current_players"
  })
  public currentPlayers: string;

  @Column({
    field: "num_current_players"
  })
  public numberOfCurrentPlayers: number;

  @Column
  public capacity: number;

  @Column
  public ip: string;

  @Column
  public online: boolean;

  @Column
  public ranked: boolean;

  @Column({
    field: "map_list"
  })
  public mapList: string;

  @Column({
    field: "rounds_per_map"
  })
  public roundsPerMap: string;

  @Column({
    field: "current_round"
  })
  public currentRound: string;

  @Column({
    field: "current_map"
  })
  public currentMap: number;
}
