import { Column, DataType, Model, Table } from "sequelize-typescript";

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
  private userId: number;

  @Column
  private online: number;

  @Column({
    field: "ip_address"
  })
  private ipAddress: string;
}
