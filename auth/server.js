import app from "./src/app.js";
import connectDB from "./src/db/db.js";

import { connect } from "./src/broker/rabbit.js";

// connect to database
connectDB();

// connect to rabbitmq
connect();

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});