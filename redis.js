import { Redis } from "ioredis";

function createRedisClient() {

    if (process.env.REDIS_URL) {
        return new Redis(process.env.REDIS_URL, {
            maxRetriesPerRequest: null,
        });
    }
    
    return new Redis({
        host: "localhost",
        port: 6379,
    });
}

const subscriber = createRedisClient();
const publisher = createRedisClient();
const redis = createRedisClient();

export { subscriber, publisher, redis };
