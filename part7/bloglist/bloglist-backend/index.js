const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
