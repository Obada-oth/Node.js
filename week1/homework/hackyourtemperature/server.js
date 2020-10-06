const express = require("express");
const axios = require("axios");
const exphbs = require("express-handlebars");

const app = express();

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("home"));

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.render("home", {
    cityName,
  });
});

// app.get("/", (req, res) => {
//   res.send({ msg: "Hello from the backend to the client" });
// });

const port = process.env.PORT || 3000;

app.listen(port);
