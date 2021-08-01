import {
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";

import OwnedItem from "./ownedItem";
import Wallet from "./wallet";

@Scopes(() => ({
  full: {
    include: [Wallet],
  },
  wallet: {
    attributes: [],
    include: [Wallet],
  },
}))
@Table({
  indexes: [
    {
      fields: ["user_id", "is_main"],
    },
  ],
  tableName: "game_soldiers",
  underscored: true,
})
export default class Soldier extends Model<Soldier> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Unique
  @Column
  public soldierName: string;

  @Column
  public userId: number;

  @Column
  public online: number;

  @Column
  public ipAddress: string;

  @Column
  public level: number;

  @Column
  public kit: number;

  @Column
  public xp: number;

  @Column
  public isMain: boolean;

  @CreatedAt
  public createdAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @HasMany(() => OwnedItem, "ownerId")
  public items: OwnedItem[];
}
