const express = require("express");
const app = express();
const fs = require("fs");
let { title } = require("process");
let data = require("./posts.json");
app.use(express.json());

// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => {
  title = req.body.title;
  content = req.body.content;
  fs.writeFileSync(title, content);
  data.push(req.body);

  res.end("ok");
});

app.get("/blogs/:title", (req, res) => {
  title = req.params.title;
  content = req.body.content;

  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);

    res.end(post);
  } else {
    res.status(404);
    res.send("post is not found");
  }
});

app.put("/posts/:title", (req, res) => {
  title = req.params.title;
  content = req.body.content;

  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    res.send("title not found");
  }
});

app.delete("/blogs/:title", (req, res) => {
  title = req.params.title;

  if (fs.existsSync(title)) {
    fs.unlinkSync(title);

    data.splice(data.indexOf(title), 1);

    res.end("ok");
  } else {
    res.send("title not found");
  }
});

app.get("/blogs", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(data);
});

app.listen(3000);
