/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */

//  This is not exactly what the exercise is asking (using node to run the code and logging to the console )
// but I tried to solve this from the server side by writing one and making it send a request to the wanted API
// Then sending the response to the client.
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const credentials = "Basic YWRtaW46aHZnWDhLbFZFYQ";
const url = `https://restapiabasicauthe-sandbox.mxapps.io/api/books`;

app.get("/", async (req, res) => {
  try {
    const response = await fetch(url, {
      headers: { Authorization: credentials },
    });
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.send({ msg: "Something went wrong!" });
  }
});
const port = process.env.PORT || 3000;
app.listen(port);
