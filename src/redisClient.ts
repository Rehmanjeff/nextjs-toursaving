import Redis, { RedisOptions, Redis as RedisClient } from 'ioredis';

const redisOptions: RedisOptions = {
  host: 'localhost',
  port: 6379,
};

const redisClient: RedisClient = new Redis(redisOptions);

export default redisClient;
