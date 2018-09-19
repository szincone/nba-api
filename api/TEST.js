players = require("../scraper/scraper.js");

console.log("PLAYERS INITIAL", typeof players.length);

if (typeof players.length === "undefined") {
  console.log("Fetching data");
} else {
  console.log("PLAYERS AFTER", players);
}
