import jwt from "jsonwebtoken";
import _config from "../config/config.js";
import redis from "../db/redis.js";

const authArtistMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isTokenBlacklisted = await redis.get(`bl_${token}`);

        if (isTokenBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, _config.JWT_SECRET);

        if (decodedToken.role !== "artist") {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { authArtistMiddleware };