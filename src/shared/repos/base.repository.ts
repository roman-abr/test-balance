import {DatabaseService} from "@modules/database/database.service";
import {ClassConstructor, instanceToPlain, plainToInstance} from "class-transformer";
import {BaseEntity} from "../entities/base.entity";
import { NotFoundException } from '@nestjs/common';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected db: DatabaseService, protected tableName: string, protected cls: ClassConstructor<T>) {
  }

  async create(body: Partial<T>): Promise<T> {
    const obj = instanceToPlain(body);
    const keys = Object.keys(obj).filter(k => k !== 'id');
    const result = await this.db.query(`
      INSERT INTO ${this.tableName}(${keys.join(',')}) VALUES (${keys.map((_, i) => `$${i+1}`).join(',')}) RETURNING *`, 
      keys.map(k => obj[k]));
    return plainToInstance(this.cls, result.rows[0]);
  };

  async findById(id: number): Promise<T> {
    const result = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id=$1 LIMIT 1`, [id]);
    if (!result.rows.length) {
      throw new NotFoundException("Entity not found");
    }
    return plainToInstance(this.cls, result.rows[0]);
  }

  async findAll(): Promise<T[]> {
    const result = await this.db.query(`SELECT * FROM ${this.tableName}`);
    if (!result.rows.length) {
      return [];
    }
    return result.rows.map(r => plainToInstance(this.cls, r));
  }

  async removeById(id: number): Promise<void> {
    await this.db.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
  }

}