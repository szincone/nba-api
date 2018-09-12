const request = require("request");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");
request(
  "https://www.basketball-reference.com/leagues/NBA_2017_per_game.html",
  (error, res, html) => {
    let playerTableRaw = [];
    let playerTable = [];
    if (!error && res.statusCode === 200) {
      $ = cheerio.load(html);
      // gets player table from website
      $("table").text();
      cheerioTableparser($);
      playerTableRaw = $("table").parsetable(true);
    }
    // removing duplicate players NOT WORKING
    for (let i = 0; i <= playerTableRaw.length; i++) {
      for (let j = 0; j <= playerTableRaw.length; j++) {
        if (playerTableRaw[i][j] !== playerTableRaw[i][j + 1]) {
          console.log("FINNA", playerTableRaw[i][j]);
          // playerTable.push(playerTableRaw[i][j]);
        } else {
          // do nothing
        }
      }
    }
    // === COLUMNS === //
    // rank column - each col needs this pattern to get rid of duplicates
    let rankColRaw = playerTable[0];
    let rankCol = [];
    rankCol.push(rankColRaw[0]);
    rankColRaw.forEach(element => {
      if (element !== rankColRaw[0]) {
        // all items in 'rank' column
        rankCol.push(element);
      }
    });
    console.log("TEST", rankCol);
    // player column
    let playerColRaw = playerTable[1];
    let playerCol = [];
    playerCol.push(playerColRaw[0]);
    playerColRaw.forEach(element => {
      if (element !== playerColRaw[0]) {
        // gets inner text from a-tag using regex
        // to match and get rid of angle brackets
        playerCol.push(
          element
            .match(/>(.*?)</g)
            .toString()
            .replace(/[<>]/g, ""),
        );
      }
    });
    // position column
    let posColRaw = playerTable[2];
    let posCol = [];
    posCol.push(posColRaw[0]);
    posColRaw.forEach(element => {
      if (element !== posColRaw[0]) {
        // all items in 'pos' column
        posCol.push(element);
      }
    });
  },
);
