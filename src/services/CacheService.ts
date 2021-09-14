import Redis, { Redis as RedisClient } from 'ioredis';

import redisConfig from '../config/redis';

export class CacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(redisConfig);
  }

  public async save(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async getCache<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const parseData = JSON.parse(data) as T;
    return parseData;
  }

  public async invalidatePrefix(key: string): Promise<void> {
    const keys = await this.client.keys(`${key}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
