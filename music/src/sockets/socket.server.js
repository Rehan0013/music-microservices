import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import redis from "../db/redis.js";

import _config from "../config/config.js";


async function initSocketServer(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        },
    });

    io.use(async (socket, next) => {
        const token = cookie.parse(socket.handshake.headers.cookie);
        if (!token) {
            return next(new Error("Authentication error"));
        }

        const isTokenBlacklisted = await redis.get(`bl_${token}`);

        if (isTokenBlacklisted) {
            return next(new Error("Authentication error"));
        }

        jwt.verify(token, _config.JWT_SECRET, async (err, user) => {
            if (err) {
                return next(new Error("Authentication error"));
            }
            socket.user = user;
            next();
        });
    });

    io.on("connection", (socket) => {
        socket.join(socket.user.id);
        console.log("User connected", socket.id);

        socket.on("play", (data) => {
            const musicId = data.musicId;
            socket.broadcast.to(socket.user.id).emit("play", { musicId });
        });

        socket.on("pause", (data) => {
            const musicId = data.musicId;
            socket.broadcast.to(socket.user.id).emit("pause", { musicId });
        });

        socket.on("disconnect", () => {
            socket.leave(socket.user.id);
            console.log("User disconnected", socket.id);
        });
    });
}

export default initSocketServer;
