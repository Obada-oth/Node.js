/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */

// This is not exactly what the exercise is asking (using node to run the code and logging to the console )
// but I tried to solve this from the server side by writing one and making it send a request to the wanted API
// Then sending the response to the client.

const express = require("express");
const app = express();
const fetch = require("node-fetch");
const url = "http://api.icndb.com/jokes/random?escape=javascript";

app.get("/", async (req, res) => {
  // YOUR CODE GOES IN HERE

  try {
    const response = await fetch(url);
    const data = await response.json();
    const joke = data.value.joke;
    res.send(joke);

    console.log(joke);
  } catch (err) {
    console.error("fetch failed", err);
    res.status(500);
  }
});

const port = process.env.PORT || 3000;
app.listen(port);
