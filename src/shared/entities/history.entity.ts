import {Exclude, Expose, Type} from "class-transformer";
import {BaseEntity} from "./base.entity";
import {ApiProperty} from '@nestjs/swagger';
import { ActionType } from './types';

@Exclude()
export class HistoryEntity extends BaseEntity {
  @ApiProperty({name: 'user_id'})
  @Expose({name: 'user_id'})
  userId: number;

  @ApiProperty({enum: ActionType})
  @Expose()
  action: ActionType;

  @ApiProperty()
  @Expose()
  amount: number;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  ts: Date;
}