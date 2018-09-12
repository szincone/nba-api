const request = require("request");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");
request(
  "https://www.basketball-reference.com/leagues/NBA_2017_per_game.html",
  (error, res, html) => {
    let playerTable = [];
    if (!error && res.statusCode === 200) {
      $ = cheerio.load(html);
      // const table = $("tbody")
      //   .children("tr")
      //   .text();
      // console.log(table);

      $("table").text();
      cheerioTableparser($);
      playerTable = $("table").parsetable(true, true, true);
      console.log(playerTable);
    }
  },
);
