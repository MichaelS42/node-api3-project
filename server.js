const express = require("express");
const helmet = require("helmet");
const server = express();
const userRouter = require("./users/userRouter.js");

server.use(express.json());
server.use(helmet());

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${
      req.headers.origin
    }`
  );
  next();
}

server.use(logger);

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.get("/", (req, res) => {
  res.status(200).json({ message: "server is online" });
});

function errorHandler(error, req, res, next) {
  res.status(error.status).json(error);
}

server.use(errorHandler);

module.exports = server;
