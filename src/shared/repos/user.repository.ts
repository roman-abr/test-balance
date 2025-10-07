import {DatabaseService} from "@modules/database/database.service";
import {Injectable, NotFoundException} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {UserEntity} from "../entities/user.entity";
import { TableName } from './types';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(db: DatabaseService) {
    super(db, TableName.Users, UserEntity);
  }

  async withdraw(userId: number, amount: number): Promise<UserEntity> {
    const result = await this.db.query(`
      WITH user_balance AS(
        SELECT id, balance FROM ${this.tableName} WHERE id = $1 AND balance > 0 FOR UPDATE
      )
      UPDATE ${this.tableName} SET balance = user_balance.balance - $2 FROM user_balance WHERE ${this.tableName}.id = user_balance.id 
      RETURNING ${this.tableName}.*
      `, [userId, amount]);
    if (!result.rows.length) {
      throw new NotFoundException("Not found user with positive balance");
    }
    return plainToInstance(this.cls, result.rows[0]);
  }
}