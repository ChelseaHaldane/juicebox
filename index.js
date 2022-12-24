require("dotenv").config();
const PORT = 3000;
const express = require("express");
const server = express();
const morgan = require("morgan");
const { client } = require("./db");
const apiRouter = require("./api/index");

client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

server.use(morgan("dev"));

server.use(express.json());
server.use("/api", apiRouter);

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("____Body Logger END____>");

  next();
});

server.get("/", (req, res) => {
  res.send("A get request was made to /");
});

server.use("/", (req, res, next) => {
  console.log("A request was made to /");
  next();
});

server.get("/background/:color", (req, res, next) => {
  res.send(`
    <body style="background: ${req.params.color};">
      <h1>Hello World</h1>
    </body>
  `);
});
