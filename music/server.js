import app from "./src/app.js";
import _config from "./src/config/config.js";

import initSocketServer from "./src/sockets/socket.server.js";
import http from "http";

import connectDB from "./src/db/db.js";

const httpServer = http.createServer(app);

connectDB();

initSocketServer(httpServer);

httpServer.listen(_config.PORT, () => {
    console.log(`Server is running on port ${_config.PORT}`);
});
