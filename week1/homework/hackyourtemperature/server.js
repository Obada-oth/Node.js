const express = require("express");
const axios = require("axios");
const exphbs = require("express-handlebars");
const { response } = require("express");
const API_KEY = require("./sources/keys.json").API_KEY;

const app = express();

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("home"));

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;

  axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`
  )
    .then((response) => {
      const data = response.data;
      const temp = data.main.temp;
      res.render("home", {
        weatherText: `Current temperature in ${data.name} is ${temp}`,
      });
    })

    .catch((err) => {
      if (err.response.data.cod === "404") {
        console.log(err);
        res.render("home", {
          weatherText: `"${cityName}" is not found in our database!`,
        });
      } else if (err.response.data.cod === "400") {
        console.log(err);
        res.render("home", {
          weatherText: `Bad request : ${err.response.data.message}, please type a city name.`,
        });
      } else {
        console.log(err);
        res.status(500);
        res.send("Server Error!");
      }
    });
});

const port = process.env.PORT || 3000;

app.listen(port);
