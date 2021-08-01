import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import Item from "./item";

@Table({
  tableName: "game_offers",
  underscored: true,
})
export default class Offer extends Model<Offer> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public limit: string;

  @Column({
    type: DataType.ENUM("_PF", "_AC"),
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

  @CreatedAt
  public createdAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
