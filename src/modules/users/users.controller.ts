import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { WithdrawRequestDto } from './request.dto';
import { HistoryResponseDto, UserFullResponseDto, UserResponseDto } from './response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { HistoryEntity } from '@shared/entities/history.entity';

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
  async getOne(@Param('id', ParseIntPipe) userId: number): Promise<UserResponseDto> {
    return this.service.getOne(userId);
  }

  @Get(':id/full')
  @ApiResponse({type: UserFullResponseDto})
  async getFull(@Param('id', ParseIntPipe) userId: number): Promise<UserFullResponseDto> {
    return this.service.getFull(userId);
  }

  @Get(':id/history')
  @ApiResponse({type: HistoryEntity, isArray: true})
  async getList(@Param('id', ParseIntPipe) userId: number): Promise<HistoryEntity[]> {
    return this.service.getHistory(userId);
  }

}