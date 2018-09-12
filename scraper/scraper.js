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
      playerTable = $("table").parsetable(true);
    }
    // each column needs this pattern, to
    // get rid of dups
    // rank column
    let rankHeaderColRaw = playerTable[0];
    let rankHeaderCol = [];
    rankHeaderCol.push(rankHeaderColRaw[0]);
    rankHeaderColRaw.forEach(element => {
      if (element !== rankHeaderColRaw[0]) {
        rankHeaderCol.push(element);
      }
    });

    // player column
    let playerHeaderColRaw = playerTable[1];
    let playerHeaderCol = [];
    playerHeaderCol.push(playerHeaderColRaw[0]);
    playerHeaderColRaw.forEach(element => {
      if (element !== playerHeaderColRaw[0]) {
        playerHeaderCol.push(
          element
            .match(/>(.*?)</g)
            .toString()
            .replace(/[<>]/g, ""),
        );
      }
    });
  },
);
