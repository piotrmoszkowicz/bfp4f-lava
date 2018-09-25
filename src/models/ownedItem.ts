import {
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import Hero from "./hero";
import Item from "./item";

@DefaultScope({
  attributes: ["availableTill", "createdAt", "useCount"]
})
@Table({
  tableName: "game_owned_items"
})
export default class OwnedItem extends Model<OwnedItem> {
  @ForeignKey(() => Hero)
  @Column
  public ownerId: number;

  @ForeignKey(() => Item)
  @Column
  public itemId: number;

  @Column
  public useCount: number;

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
