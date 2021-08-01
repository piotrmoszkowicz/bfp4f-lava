import {
  AutoIncrement,
  Column,
  CreatedAt,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import Item from "./item";
import Soldier from "./soldier";

@DefaultScope(() => ({
  attributes: ["availableTill", "barPosition", "createdAt", "useCount"],
}))
@Table({
  indexes: [
    {
      fields: ["owner_id"],
    },
  ],
  tableName: "game_owned_items",
  underscored: true,
})
export default class OwnedItem extends Model<OwnedItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @ForeignKey(() => Soldier)
  @Column
  public ownerId: number;

  @ForeignKey(() => Item)
  @Column
  public itemId: number;

  @Column
  public useCount: number;

  @Column
  public barPosition: number;

  @CreatedAt
  public createdAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @Column({
    field: "available_till",
  })
  public availableTill: string;
}
