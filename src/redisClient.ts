import Redis, { RedisOptions, Redis as RedisClient } from 'ioredis';

const redisClient: RedisClient = new Redis("rediss://default:103383b069d24a48968ab39c296cb95b@cheerful-gecko-37606.upstash.io:37606");

export default redisClient;
