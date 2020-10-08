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
    if (isInvalid(req)) {
      handleInvalidError(res);
    } else {
      title = req.body.title;
      content = req.body.content;
      fs.writeFileSync(title, content);
      data.push(req.body);

      res.end("ok");
    }
  } catch (err) {
    handleServerError(res);
    console.error(err);
  }
});

app.get("/blogs/:title", (req, res) => {
  title = req.params.title;
  content = req.body.content;

  try {
    if (isNotFound(title)) {
      handleNotFoundError(res);
    } else {
      const post = fs.readFileSync(title);

      res.send(post);
    }
  } catch (err) {
    handleServerError(res);
    console.error(err);
  }
});

app.put("/posts/:title", (req, res) => {
  title = req.params.title;
  content = req.body.content;
  try {
    if (isInvalid(req)) {
      handleInvalidError(res);
    } else if (isNotFound(title)) {
      handleNotFoundError(res);
    } else {
      fs.writeFileSync(title, content);
      res.end("ok");
    }
  } catch (err) {
    handleServerError(res);
    console.error(err);
  }
});

app.delete("/blogs/:title", (req, res) => {
  title = req.params.title;

  try {
    if (isNotFound(title)) {
      handleNotFoundError(res);
    } else {
      fs.unlinkSync(title);

      data.splice(data.indexOf(title), 1);

      res.end("ok");
    }
  } catch (err) {
    console.error(err);
    handleServerError(res);
  }
});

app.get("/blogs", (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (err) {
    handleServerError(res);
    console.error(err);
  }
});

function isInvalid(req) {
  if (
    typeof req.body == "undefined" ||
    typeof req.body.title == "undefined" ||
    typeof req.body.content == "undefined"
    // !fs.existsSync(title)
  ) {
    return true;
  } else {
    return false;
  }
}
function isNotFound(title) {
  if (!fs.existsSync(title)) {
    return true;
  } else {
    return false;
  }
}
function handleInvalidError(res) {
  res.status(400);
  res.send("Invalid input.Please fill in all required fields ");
}

function handleNotFoundError(res) {
  res.status(404);
  res.send("Post not found");
}

function handleServerError(res) {
  res.status(500);
  res.send("server error");
}

app.listen(3000);
