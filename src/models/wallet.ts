import {BelongsTo, Column, DataType, DefaultScope, Model, Table} from "sequelize-typescript";
import Hero from "./hero";

@DefaultScope({
  attributes: ["currency", "value"]
})
@Table({
  tableName: "game_wallets"
})
export default class Wallet extends Model<Wallet> {
  @BelongsTo(() => Hero, "heroID")
  public hero: Hero;

  @Column({
    type: DataType.ENUM("_PF", "_AC")
  })
  public currency: Currency;

  @Column
  public value: number;
}
