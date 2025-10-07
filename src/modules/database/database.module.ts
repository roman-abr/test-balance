import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {DatabaseService} from './database.service';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseConfig, DatabaseService],
  exports: [DatabaseService]
})

export class DatabaseModule {
}