import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

export class CacheService {
  constructor(@InjectRedis() private redis: Redis) {}

  async getData(key: string): Promise<object|undefined> {
    const data = await this.redis.get(key);
    if (!data) {
      return;
    }
    return JSON.parse(data);  
  }

  async setData(key: string, data: object, ttl: number): Promise<void> {
    if (Object.keys(data).length) {
      await this.redis.set(key, JSON.stringify(data), 'PX', ttl);
    }
  }
}