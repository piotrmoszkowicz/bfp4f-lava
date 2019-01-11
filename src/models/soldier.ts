import {
  Column,
  DataType,
  HasMany,
  Model,
  Scopes,
  Table
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
  tableName: "game_soldiers"
})
export default class Soldier extends Model<Soldier> {
  @Column
  public soldierName: string;

  @Column({
    field: "created_at",
    type: DataType.DATE
  })
  public createdAt: string;

  @Column({
    field: "deleted_at",
    type: DataType.DATE
  })
  public deletedAt: string;

  @Column({
    field: "updated_at",
    type: DataType.DATE
  })
  public updatedAt: string;

  @Column({
    field: "user_id"
  })
  public userId: number;

  @Column
  public online: number;

  @Column({
    field: "ip_address"
  })
  public ipAddress: string;

  @Column
  public level: number;

  @Column
  public kit: number;

  @Column
  public xp: number;

  @Column
  public isMain: boolean;

  @HasMany(() => OwnedItem, "ownerId")
  public items: OwnedItem[];
}
