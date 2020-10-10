/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

// This is not exactly what the exercise is asking (using node to run the code and logging to the console )
// but I tried to solve this from the server side by writing one and making it send a request to the wanted API
// Then sending the response to the client.

const express = require("express");
const app = express();
const fetch = require("node-fetch");
const url = "https://reservation100-sandbox.mxapps.io/api/reservations";

app.use(express.json());

app.post("/reservations", async (req, res) => {
  try {
    const body = { name: "Obi", numberOfPeople: 2 };
    const newReservation = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const confirmation = await newReservation.json();
    console.log(confirmation);
    res.send(confirmation);
  } catch (err) {
    console.error(err);
    res.send("Oops!");
  }
});
const port = process.env.PORT || 3000;
app.listen(port);
