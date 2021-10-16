import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import redisConfig from '../../config/redis';

const bruteStorage = new BruteRedis(redisConfig);

export const bruteForce = new Brute(bruteStorage, {
  freeRetries: 7, // 7 tentativas para ser bloqueado
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  lifetime: 24 * 60 * 60, // 1 day
});
