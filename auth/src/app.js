import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

// config
import _config from "../src/config/config.js";
// google oauth
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

//import routes
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use(passport.initialize());
// Configure Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: _config.CLIENT_ID,
    clientSecret: _config.CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Here, you would typically find or create a user in your database
    // For this example, we'll just return the profile
    return done(null, profile);
}));

// health check with up time
app.get("/health", (req, res) => {
    res.json({ message: "Auth service is running", uptime: process.uptime() });
});

//routes
app.use("/api/auth", authRoutes);

export default app;
