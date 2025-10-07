import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@modules/database/database.module';
import { MigrationModule } from '@modules/migrations/migration.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@modules/users/users.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheModule } from '@modules/cache/cache.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@shared/cache.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MigrationModule,
    UsersModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.getOrThrow('REDIS_URL'),
      }),
    }),
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },],
})
export class AppModule {}
