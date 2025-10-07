import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { WithdrawRequestDto } from './request.dto';
import { HistoryResponseDto, UserFullResponseDto, UserResponseDto } from './response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { HistoryEntity } from '@shared/entities/history.entity';
import { Cache } from '@shared/cache.decorator';

@Controller('users')
export class UsersController {

  constructor(private service: UsersService) {}

  @Post(':id/withdraw')
  @ApiResponse({type: HistoryResponseDto})
  async withdraw(@Param('id', ParseIntPipe) userId: number,@Body() body: WithdrawRequestDto): Promise<UserResponseDto> {
    return this.service.withdraw({userId, ...body});
  }

  @Get(':id')
  @ApiResponse({type: UserResponseDto})
  @Cache({ttl: 3000, key: (req) => `user_${req?.params?.id}`})
  async getOne(@Param('id', ParseIntPipe) userId: number): Promise<UserResponseDto> {
    return this.service.getOne(userId);
  }

  @Get(':id/full')
  @ApiResponse({type: UserFullResponseDto})
  @Cache({ttl: 3000, key: (req) => `full_${req?.params?.id}`})
  async getFull(@Param('id', ParseIntPipe) userId: number): Promise<UserFullResponseDto> {
    return this.service.getFull(userId);
  }

  @Get(':id/history')
  @ApiResponse({type: HistoryEntity, isArray: true})
  @Cache({ttl: 3000, key: (req) => `history_${req?.params?.id}`})
  async getList(@Param('id', ParseIntPipe) userId: number): Promise<HistoryEntity[]> {
    return this.service.getHistory(userId);
  }

}