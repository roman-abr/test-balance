import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_METADATA, CacheOptions } from './cache.decorator';
import { CacheService } from '@modules/cache/cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CacheInterceptor.name);
  constructor(
    private reflector: Reflector,
    private cacheService: CacheService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const cacheableOptions = this.reflector.get<CacheOptions>(
      CACHE_METADATA,
      context.getHandler(),
    );

    if (!cacheableOptions) {
      return next.handle();
    }

    const { ttl, key } = cacheableOptions;
    let cacheKey: string;
    if (typeof key === 'function') {
      const args = context.getArgs();
      cacheKey = key(...args);
    } else {
      cacheKey = key
    }

    const cachedData = await this.cacheService.getData(cacheKey);

    if (cachedData) {
      this.logger.log(`Got from cache ${cacheKey}`);
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(async (data) => {
        await this.cacheService.setData(cacheKey, data, ttl);
      }),
    );
  }
}