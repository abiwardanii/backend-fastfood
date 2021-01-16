/* eslint-disable no-unused-vars */
require("dotenv/config");
const express = require("express");
const server = express();
const routes = require("./src/main");
const db = require("./src/Config/db");
const bodyPars = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const redis = require("./src/Config/redis");
const logger = require("./src/Config/winston");

server.use(bodyPars.urlencoded({ extended: false }));
server.use(bodyPars.json());
server.use(morgan("short", { stream: logger.stream }));
server.use("/public", express.static("public"));
server.use(cors());
server.use(routes);

db.ConnectDB()

redis
  .redisCheck()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
server.listen(2000, () => {
  console.log("Service is running on port 2000 !");
});
