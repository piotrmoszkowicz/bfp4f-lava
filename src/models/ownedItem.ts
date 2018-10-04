import {
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";

import Item from "./item";
import Soldier from "./soldier";

@DefaultScope({
  attributes: ["availableTill", "barPosition", "createdAt", "useCount"]
})
@Table({
  tableName: "game_owned_items"
})
export default class OwnedItem extends Model<OwnedItem> {
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

  @Column({
    field: "created_at",
    type: DataType.DATE
  })
  public createdAt: string;

  @Column({
    field: "available_till"
  })
  public availableTill: string;
}
