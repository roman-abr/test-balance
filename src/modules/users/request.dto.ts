import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDecimal, IsPositive } from 'class-validator';

export class WithdrawRequestDto {
  @ApiProperty()
  @Expose()
  @IsPositive()
  // @IsDecimal({force_decimal: true, decimal_digits: '2'})
  
  amount: number;
}
