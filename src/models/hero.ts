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
  tableName: "game_heroes"
})
export default class Hero extends Model<Hero> {
  @Column
  public heroName: string;

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

  @Column
  public sessionId: string;

  @Column({
    field: "ip_address"
  })
  public ipAddress: string;

  @HasMany(() => OwnedItem)
  public items: OwnedItem[];
}
