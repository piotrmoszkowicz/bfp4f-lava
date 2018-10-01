import {
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  Model,
  Table
} from "sequelize-typescript";
import User from "./user";

@DefaultScope({
  attributes: ["currency", "value"]
})
@Table({
  tableName: "game_wallets"
})
export default class Wallet extends Model<Wallet> {
  @BelongsTo(() => User, "userID")
  public user: User;

  @Column({
    type: DataType.ENUM("_PF", "_AC")
  })
  public currency: Currency;

  @Column
  public value: number;
}
