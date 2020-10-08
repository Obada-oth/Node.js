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
  try {
    title = req.body.title;
    content = req.body.content;
    fs.writeFileSync(title, content);
    data.push(req.body);

    res.end("ok");
  } catch (err) {
    handleServerError(res);
  }
});

app.get("/blogs/:title", (req, res) => {
  title = req.params.title;
  content = req.body.content;

  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);

    res.send(post);
  } else {
    handleNotFoundError(res);
  }
});

app.put("/posts/:title", (req, res) => {
  title = req.params.title;
  content = req.body.content;

  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    handleNotFoundError(res);
  }
});

app.delete("/blogs/:title", (req, res) => {
  title = req.params.title;

  if (fs.existsSync(title)) {
    fs.unlinkSync(title);

    data.splice(data.indexOf(title), 1);

    res.end("ok");
  } else {
    handleNotFoundError(res);
  }
});

app.get("/blogs", (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (err) {
    handleServerError(res);
  }
});

function handleNotFoundError(res) {
  res.status(404);
  res.send("title not found");
}

function handleServerError(res) {
  res.status(500);
  res.send("server error");
}

app.listen(3000);
