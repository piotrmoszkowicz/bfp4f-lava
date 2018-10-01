import {
  Column,
  Model,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "users"
})
export default class User extends Model<User> {
  @Column({
    primaryKey: true
  })
  public id: number;

  @Column
  public sessionId: string;
};