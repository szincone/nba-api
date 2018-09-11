const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.basketball-reference.com/leagues/NBA_2017_per_game.html",
  (error, res, html) => {
    let playerTable = [];
    if (!error && res.statusCode === 200) {
      const $ = cheerio.load(html);
      // const table = $("tbody")
      //   .children("tr")
      //   .text();
      // console.log(table);
      $("tbody").each((i, el) => {
        playerTable.push(
          $(el)
            .find("tr")
            .text(),
        );
        console.log(playerTable);
      });
    }
  },
);
