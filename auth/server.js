import app from "./src/app.js";
import connectDB from "./src/db/db.js";

import { connect } from "./src/broker/rabbit.js";

import _config from "./src/config/config.js";

// connect to database
connectDB();

// connect to rabbitmq
connect();

// start server
app.listen(_config.PORT, () => {
    console.log(`Server is running on port ${_config.PORT}`);
});