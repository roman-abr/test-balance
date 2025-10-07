import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig {

  public host: string;
  public port: number;
  public username: string;
  public password: string;
  public dbName: string;

  constructor(private configService: ConfigService) {
    this.host = configService.getOrThrow<string>('POSTGRES_HOST');
    this.port = configService.getOrThrow<number>('POSTGRES_PORT');
    this.username = configService.getOrThrow<string>('POSTGRES_USER');
    this.password = configService.getOrThrow<string>('POSTGRES_PASSWORD');
    this.dbName = configService.getOrThrow<string>('POSTGRES_DB');
  }

}