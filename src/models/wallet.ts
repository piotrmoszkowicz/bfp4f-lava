import {
  Column,
  DataType,
  DefaultScope,
  Model,
  Table
} from "sequelize-typescript";

@DefaultScope({
  attributes: ["currency", "value"]
})
@Table({
  tableName: "game_wallets"
})
export default class Wallet extends Model<Wallet> {
  @Column({
    field: "user_id"
  })
  public userId: number;

  @Column({
    type: DataType.ENUM("_PF", "_AC")
  })
  public currency: Currency;

  @Column
  public value: number;
}
