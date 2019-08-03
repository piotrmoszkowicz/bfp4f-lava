import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from "sequelize-typescript";

@DefaultScope({
  attributes: ["currency", "value"]
})
@Table({
  tableName: "game_wallets",
  underscored: true
})
export default class Wallet extends Model<Wallet> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public userId: number;

  @Column({
    type: DataType.ENUM("_PF", "_AC")
  })
  public currency: Currency;

  @Column
  public value: number;

  @CreatedAt
  public createdAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
