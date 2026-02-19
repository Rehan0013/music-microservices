import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// config
import _config from "../src/config/config.js";

import musicRoutes from "../src/routes/music.routes.js";
import playlistRoutes from "../src/routes/playlist.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(cookieParser());

// health check with up time
app.get("/health", (req, res) => {
    res.json({ message: "Music service is running", uptime: process.uptime() });
});

// routes
app.use("/api/music", musicRoutes);
app.use("/api/playlist", playlistRoutes);

export default app;