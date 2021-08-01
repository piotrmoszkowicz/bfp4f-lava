import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "game_servers",
  underscored: true,
})
export default class Server extends Model<Server> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public name: string;

  @Column
  public password: string;

  @Column
  public guid: string;

  @Column({
    type: DataType.ENUM("gva", "sjc", "iad", "nrt", "syd"),
  })
  public region: ServerRegion;

  @Column
  public currentPlayers: string;

  @Column({
    field: "num_current_players",
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

  @Column
  public mapList: string;

  @Column
  public roundsPerMap: string;

  @Column
  public currentRound: string;

  @Column
  public currentMap: number;

  @CreatedAt
  public createdAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
