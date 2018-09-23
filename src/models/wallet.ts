import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import Hero from "./hero";

@Table({
  tableName: "game_wallets"
})
export default class Wallet extends Model<Wallet> {
  @ForeignKey(() => Hero)
  @Column
  public heroID: number;

  @Column({
    type: DataType.ENUM("_PF", "_AC")
  })
  public wallet: Currency;

  @Column
  public value: number;
}
