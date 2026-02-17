import app from "./src/app.js";
import _config from "./src/config/config.js";

import connectDB from "./src/db/db.js";

connectDB();

app.listen(_config.PORT, () => {
    console.log(`Server is running on port ${_config.PORT}`);
});