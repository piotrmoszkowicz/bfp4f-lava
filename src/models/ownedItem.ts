import {BelongsTo, Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import Hero from "./hero";
import Item from "./item";

@Table({
  tableName: "game_owned_items"
})
export default class OwnedItem extends Model<OwnedItem> {
  @BelongsTo(() => Hero, "ownerId")
  public hero: Hero;

  @HasOne(() => Item, "itemId")
  public item: Item;

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
