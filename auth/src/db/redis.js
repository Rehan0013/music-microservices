import Redis from "ioredis";
import config from "../config/config.js";

const redis = new Redis(config.REDIS_URI);

redis.on("connect", () => {
    console.log("Connected to Redis");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});

export default redis;
