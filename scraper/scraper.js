const request = require("request");
const cheerio = require("cheerio");
// since our data is a table, use table parser to clean up
const cheerioTableparser = require("cheerio-tableparser");

// sends request to site to be scraped
request(
  "https://www.basketball-reference.com/leagues/NBA_2017_per_game.html",
  (error, res, html) => {
    let playerTable = [];
    if (!error && res.statusCode === 200) {
      $ = cheerio.load(html);
      // gets player table from website
      $("table").text();
      cheerioTableparser($);
      playerTable = $("table").parsetable(true);
    }

    // === COLUMNS === //

    // rank column - each col needs this pattern to get rid of duplicates
    let rankColRaw = playerTable[0];
    let rankCol = [];
    // first row is header, add this to avoid dups later
    rankCol.push(rankColRaw[0]);
    // iterate over each row of table and assign to new array
    rankColRaw.forEach(element => {
      // if not equal to header(since its already in the array), add to new array
      if (element !== rankColRaw[0]) {
        // all items in 'rank' column
        rankCol.push(element);
      }
    });

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

    // team column
    let teamColRaw = playerTable[4];
    let teamCol = [];
    teamCol.push(teamColRaw[0]);
    teamColRaw.forEach(element => {
      if (element !== teamColRaw[0]) {
        // account for variation on TOTAL team for
        // traded players is displayed on table
        if (element === "TOT") {
          // gets inner text from a-tag using regex
          // to match and get rid of angle brackets
          teamCol.push("TOT");
        } else {
          teamCol.push(
            element
              .match(/>(.*?)</g)
              .toString()
              .replace(/[<>]/g, ""),
          );
        }
      }
    });

    // games played column
    let gamesPlayedColRaw = playerTable[5];
    let gamesPlayedCol = [];
    gamesPlayedCol.push(gamesPlayedColRaw[0]);
    gamesPlayedColRaw.forEach(element => {
      if (element !== gamesPlayedColRaw[0]) {
        // all items in 'gamesPlayed' column
        gamesPlayedCol.push(element);
      }
    });

    // minutes per game column
    let minsPerGameColRaw = playerTable[7];
    let minsPerGameCol = [];
    minsPerGameCol.push(minsPerGameColRaw[0]);
    minsPerGameColRaw.forEach(element => {
      if (element !== minsPerGameColRaw[0]) {
        // all items in 'minsPerGame' column
        minsPerGameCol.push(element);
      }
    });

    console.log(
      "Rank",
      rankCol[385],
      "PlayerName",
      playerCol[385],
      "Position",
      posCol[385],
      "TeamName",
      teamCol[385],
      "Games Played",
      gamesPlayedCol[385],
      "Minutes per game",
      minsPerGameCol[385],
    );
  },
);
