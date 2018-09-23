import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import Hero from "./hero";
import Item from "./item";

@Table({
  tableName: "game_owned_items"
})
export default class OwnedItem extends Model<OwnedItem> {
  @ForeignKey(() => Item)
  @Column
  public itemId: number;

  @Column
  public useCount: number;

  @ForeignKey(() => Hero)
  @Column
  public ownerId: number;

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
