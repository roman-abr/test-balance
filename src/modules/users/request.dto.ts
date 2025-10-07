import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class WithdrawRequestDto {
  @ApiProperty()
  @Expose()
  @IsPositive()
  @IsNumber({maxDecimalPlaces: 2})
  amount: number;
}
