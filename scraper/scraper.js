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
        gamesPlayedCol.push(parseFloat(element));
      }
    });

    // minutes per game column
    let minsPerGameColRaw = playerTable[7];
    let minsPerGameCol = [];
    minsPerGameCol.push(minsPerGameColRaw[0]);
    minsPerGameColRaw.forEach(element => {
      if (element !== minsPerGameColRaw[0]) {
        // all items in 'minsPerGame' column
        minsPerGameCol.push(parseFloat(element));
      }
    });

    // field goals per game column
    let fieldGoalsPerGameColRaw = playerTable[8];
    let fieldGoalsPerGameCol = [];
    fieldGoalsPerGameCol.push(fieldGoalsPerGameColRaw[0]);
    fieldGoalsPerGameColRaw.forEach(element => {
      if (element !== fieldGoalsPerGameColRaw[0]) {
        // all items in 'fieldGoalsPerGame' column
        fieldGoalsPerGameCol.push(parseFloat(element));
      }
    });

    // field goal attempts per game column
    let fieldGoalAttemptsPerGameColRaw = playerTable[9];
    let fieldGoalAttemptsPerGameCol = [];
    fieldGoalAttemptsPerGameCol.push(fieldGoalAttemptsPerGameColRaw[0]);
    fieldGoalAttemptsPerGameColRaw.forEach(element => {
      if (element !== fieldGoalAttemptsPerGameColRaw[0]) {
        // all items in 'fieldGoalAttemptsPerGame' column
        fieldGoalAttemptsPerGameCol.push(parseFloat(element));
      }
    });

    // field goal percentage column
    let fieldGoalPercentageColRaw = playerTable[10];
    let fieldGoalPercentageCol = [];
    fieldGoalPercentageCol.push(fieldGoalPercentageColRaw[0]);
    fieldGoalPercentageColRaw.forEach(element => {
      if (element !== fieldGoalPercentageColRaw[0]) {
        // all items in 'fieldGoalPercentage' column
        fieldGoalPercentageCol.push(parseFloat(element));
      }
    });

    // 3-pointers made per game column
    let threePointersPerGameColRaw = playerTable[11];
    let threePointersPerGameCol = [];
    threePointersPerGameCol.push(threePointersPerGameColRaw[0]);
    threePointersPerGameColRaw.forEach(element => {
      if (element !== threePointersPerGameColRaw[0]) {
        // all items in 'threePointersPerGame' column
        threePointersPerGameCol.push(parseFloat(element));
      }
    });

    // 3-pointers attempted per game column
    let threePointersAttemptedPerGameColRaw = playerTable[12];
    let threePointersAttemptedPerGameCol = [];
    threePointersAttemptedPerGameCol.push(
      threePointersAttemptedPerGameColRaw[0],
    );
    threePointersAttemptedPerGameColRaw.forEach(element => {
      if (element !== threePointersAttemptedPerGameColRaw[0]) {
        // all items in 'threePointersAttemptedPerGame' column
        threePointersAttemptedPerGameCol.push(parseFloat(element));
      }
    });

    // 3-pointer percentage column
    let threePointerPercentageColRaw = playerTable[13];
    let threePointerPercentageCol = [];
    threePointerPercentageCol.push(threePointerPercentageColRaw[0]);
    threePointerPercentageColRaw.forEach(element => {
      if (element !== threePointerPercentageColRaw[0]) {
        // all items in 'threePointerPercentage' column
        threePointerPercentageCol.push(parseFloat(element));
      }
    });

    // 2-pointers made per game column
    let twoPointersPerGameColRaw = playerTable[14];
    let twoPointersPerGameCol = [];
    twoPointersPerGameCol.push(twoPointersPerGameColRaw[0]);
    twoPointersPerGameColRaw.forEach(element => {
      if (element !== twoPointersPerGameColRaw[0]) {
        // all items in 'twoPointersPerGame' column
        twoPointersPerGameCol.push(parseFloat(element));
      }
    });

    // 3-pointers attempted per game column
    let twoPointersAttemptedPerGameColRaw = playerTable[15];
    let twoPointersAttemptedPerGameCol = [];
    twoPointersAttemptedPerGameCol.push(twoPointersAttemptedPerGameColRaw[0]);
    twoPointersAttemptedPerGameColRaw.forEach(element => {
      if (element !== twoPointersAttemptedPerGameColRaw[0]) {
        // all items in 'twoPointersAttemptedPerGame' column
        twoPointersAttemptedPerGameCol.push(parseFloat(element));
      }
    });

    // 3-pointer percentage column
    let twoPointerPercentageColRaw = playerTable[16];
    let twoPointerPercentageCol = [];
    twoPointerPercentageCol.push(twoPointerPercentageColRaw[0]);
    twoPointerPercentageColRaw.forEach(element => {
      if (element !== twoPointerPercentageColRaw[0]) {
        // all items in 'twoPointerPercentage' column
        twoPointerPercentageCol.push(parseFloat(element));
      }
    });

    console.log(
      "Rank",
      rankCol[2],
      "PlayerName",
      playerCol[2],
      "Position",
      posCol[2],
      "Team",
      teamCol[2],
      "Games Played",
      gamesPlayedCol[2],
      "Minutes per game",
      minsPerGameCol[2],
      "Field Goals per game",
      fieldGoalsPerGameCol[2],
      "Field Goal Attempts per game",
      fieldGoalAttemptsPerGameCol[2],
    );
  },
);
