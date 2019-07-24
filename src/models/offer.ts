import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";

import Item from "./item";

@Table({
  tableName: "game_offers",
  timestamps: false
})
export default class Offer extends Model<Offer> {
  @Column({
    primaryKey: true
  })
  public id: number;

  @Column
  public limit: string;

  @Column({
    type: DataType.ENUM("_PF", "_AC")
  })
  public currency: Currency;

  @Column
  public cost: number;

  @Column
  public isUnlockOffer: boolean;

  @Column
  public isUnlimited: boolean;

  @ForeignKey(() => Item)
  @Column
  public itemId: number;
}
