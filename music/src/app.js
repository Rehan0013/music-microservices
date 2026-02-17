import express from "express";
import cors from "cors";

// config
import _config from "../src/config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// health check with up time
app.get("/health", (req, res) => {
    res.json({ message: "Music service is running", uptime: process.uptime() });
});

export default app;