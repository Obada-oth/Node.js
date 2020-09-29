const express = require("express");
const axios = require("axios");
const expressHandleBars = require("express-handlebars");

const server = express();

server.get("/", (req, res) => {
  res.send({ msg: "Hello from the backend to the client" });
});

const port = process.env.PORT || 3000;

server.listen(port);
