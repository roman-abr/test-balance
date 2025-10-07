import {Exclude, Expose, Type} from "class-transformer";
import {BaseEntity} from "./base.entity";
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Expose()
  balance: number;
}