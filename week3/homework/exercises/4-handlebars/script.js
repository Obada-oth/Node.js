/**
 * 4. Fun with Handlebars
 *
 * Write a javascript function that simulates playing the game cards against humanity.
 * The code should choose a subject and a punchline at random,
 * then replace them in a sentece using handlebars.
 *
 * Hints:
 * - Check the handlebars npm page for examples and documentation
 */

const express = require("express");
const app = express();
const handlebars = require("handlebars");
const subjects = require("./subjects");
const punchlines = require("./punchlines");

app.get("/", function drawCard(req, res) {
  // YOUR CODE GOES IN HERE
  try {
    let card = `{{subject}} is great to {{punchline}}`;
    const template = handlebars.compile(card);
    const cardData = {
      subject: getRandomElement(subjects),
      punchline: getRandomElement(punchlines),
    };

    const sentence = template(cardData);
    console.log(sentence);
    res.send(sentence);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send("Error!");
  }
});
const port = process.env.PORT || 3000;
app.listen(port);

/**
 * Given an array, return an element from it chosen at random
 */
function getRandomElement(array) {
  // YOUR CODE GOES IN HERE
  let randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}
