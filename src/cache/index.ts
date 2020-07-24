import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
	console.log("Redis connection established");
});

redis.on("error", (error: any) => {
	console.log(`"Redis error ${error}`);
});

export default redis;
