import { SetMetadata } from '@nestjs/common';

export const CACHE_METADATA = 'cache';

export interface CacheOptions {
  ttl: number;
  key: string | ((...args: any[]) => string);
}

export const Cache = (options: CacheOptions) =>
  SetMetadata(CACHE_METADATA, options);