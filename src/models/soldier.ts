import {
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  Model,
  Scopes,
  Table,
  Unique,
  UpdatedAt
} from "sequelize-typescript";

import OwnedItem from "./ownedItem";
import Wallet from "./wallet";

@Scopes({
  full: {
    include: [
      {
        model: () => Wallet
      }
    ]
  },
  wallet: {
    attributes: [],
    include: [
      {
        model: () => Wallet
      }
    ]
  }
})
@Table({
  tableName: "game_soldiers",
  underscored: true
})
export default class Soldier extends Model<Soldier> {
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
