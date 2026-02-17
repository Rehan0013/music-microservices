import Redis from "ioredis";
import _config from "../config/config.js";

const redis = new Redis(_config.REDIS_URI);

redis.on("connect", () => {
    console.log("Connected to Redis");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});

export default redis;
