import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table
} from "sequelize-typescript";

import Offer from "./offer";
import OwnedItem from "./ownedItem";

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

  @Column({
    type: DataType.TEXT
  })
  public stats: string;

  @Column
  public kit: number;

  @Column
  public buyable: boolean;

  @Column({
    field: "validation_group",
    type: DataType.ENUM("primary", "secondary", "melee", "gadget")
  })
  public validationGroup?: ValidationGroup;

  @Column({
    field: "lock_criteria"
  })
  public lockCriteria: number;

  @HasOne(() => OwnedItem, "itemId")
  public ownerData: OwnedItem;

  @HasMany(() => Offer, "id")
  public offers: Offer[];
}
