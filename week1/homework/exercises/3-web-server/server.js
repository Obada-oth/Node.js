/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const path = require("path");
const fs = require("fs");

//create a server
let server = http.createServer((req, res) => {
  // YOUR CODE GOES IN HERE

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  let extName = path.extname(filePath);

  let contentType = "text/html";

  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".html":
      contentType = "text/html";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "no-one-there.html"),
          (err, content) => {
            res.writeHead(200, { contentType: "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        res.writeHead(500);
        res.end(err.code);
      }
    } else {
      res.writeHead(200, { "content-type": contentType });
      res.end(content);
    }
  });
});

const port = process.env.PORT || 3000;

server.listen(port); // The server starts to listen on port 3000
