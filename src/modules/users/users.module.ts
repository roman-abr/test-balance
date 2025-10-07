import { DatabaseModule } from '@modules/database/database.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from '@shared/repos/user.repository';
import { ConfigModule } from '@nestjs/config';
import { HistoryRepository } from '@shared/repos/history.repository';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [UsersController],
  providers: [HistoryRepository, UserRepository, UsersService],
})
export class UsersModule {}