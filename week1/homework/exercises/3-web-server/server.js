/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

//create a server
let server = http.createServer((req, res) => {
  // YOUR CODE GOES IN HERE
  if (req.url === "/") {
    fs.readFile(
      path.join(__dirname, "public", "index.html"),
      (err, content) => {
        if (err) throw err;
        res.writeHead(200, { "content-type": "text/html" });
        res.end(content); // Ends the response
      }
    );
  } else if (req.url === "/index.js") {
    fs.readFile(path.join(__dirname, "public", "index.js"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "content-type": "text/js" });
      res.end(content); // Ends the response
    });
  } else if (req.url === "/style.css") {
    fs.readFile(path.join(__dirname, "public", "style.css"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "content-type": "text/css" });
      res.end(content); // Ends the response
    });
  }
});

const port = process.env.PORT || 3000;

server.listen(port); // The server starts to listen on port 3000
