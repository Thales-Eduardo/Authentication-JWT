import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import redisConfig from '../config/redis';
import AppError from '../errors/AppErrors';

const redisCache = redis.createClient(redisConfig);

const limiter = new RateLimiterRedis({
  storeClient: redisCache,
  keyPrefix: 'middleware',
  points: 120, // 120 requests
  duration: 3123, // per 3123 second by IP
});

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch {
    throw new AppError(
      'O usuário enviou muitas solicitações em um determinado período de tempo',
      429
    );
  }
}
