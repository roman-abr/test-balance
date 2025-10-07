import {DatabaseService} from "@modules/database/database.service";
import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {HistoryEntity} from "../entities/history.entity";
import { TableName } from './types';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class HistoryRepository extends BaseRepository<HistoryEntity> {
  constructor(db: DatabaseService) {
    super(db, TableName.History, HistoryEntity);
  }

  async findByUserId(userId: number): Promise<HistoryEntity[]> {
    const result = await this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = $1`, [userId]);
    if (!result.rows.length) {
      return [];
    }
    return result.rows.map(r => plainToInstance(this.cls, r));
  }
  
}