import mongoose from "mongoose";
import _config from "../config/config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(_config.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error", error);
    }
};

export default connectDB;