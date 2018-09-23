import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "game_items"
})
export default class Item extends Model<Item> {
  @Column({
    primaryKey: true
  })
  public id: number;

  @Column({
    type: DataType.ENUM(
      "abilities",
      "appearance",
      "boosters",
      "gadget",
      "weapons"
    )
  })
  public type: ItemType;

  @Column
  public name: string;

  @Column({
    type: DataType.ENUM(
      "assault_rifle",
      "accessory1",
      "accessory2",
      "booster_9000",
      "booster_9005",
      "face",
      "gadget",
      "head",
      "melee",
      "shotgun",
      "uniform"
    )
  })
  public category: ItemCategory;

  @Column({
    type: DataType.TEXT
  })
  public description: string;

  @Column
  public buyable: boolean;

  @Column({
    field: "lock_criteria"
  })
  public lockCriteria: number;
}
