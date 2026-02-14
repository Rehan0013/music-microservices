import app from "./src/app.js";
import connectDB from "./src/db/db.js";

// connect to database
connectDB();

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});