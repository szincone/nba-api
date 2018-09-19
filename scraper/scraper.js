const request = require("request-promise");
const cheerio = require("cheerio");
// since our data is a table, use table parser to clean up
const cheerioTableparser = require("cheerio-tableparser");
// result var
let playersArray = [];
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
    const rankColRaw = playerTable[0];
    let rankCol = [];
    // first row is header, add this to avoid dups later
    rankCol.push(rankColRaw[0]);
    // iterate over each row of table and assign to new array
    rankColRaw.forEach(stat => {
      // if not equal to header(since its already in the array), add to new array
      if (stat !== rankColRaw[0]) {
        // all items in 'rank' column
        rankCol.push(stat);
      }
    });

    // player column
    const playerColRaw = playerTable[1];
    let playerCol = [];
    playerCol.push(playerColRaw[0]);
    playerColRaw.forEach(stat => {
      if (stat !== playerColRaw[0]) {
        // gets inner text from a-tag using regex
        // to match and get rid of angle brackets
        playerCol.push(
          stat
            .match(/>(.*?)</g)
            .toString()
            .replace(/[<>]/g, ""),
        );
      }
    });

    // position column
    const posColRaw = playerTable[2];
    let posCol = [];
    posCol.push(posColRaw[0]);
    posColRaw.forEach(stat => {
      if (stat !== posColRaw[0]) {
        // all items in 'pos' column
        posCol.push(stat);
      }
    });

    // team column
    const teamColRaw = playerTable[4];
    let teamCol = [];
    teamCol.push(teamColRaw[0]);
    teamColRaw.forEach(stat => {
      if (stat !== teamColRaw[0]) {
        // account for variation on TOTAL team for
        // traded players is displayed on table
        if (stat === "TOT") {
          // gets inner text from a-tag using regex
          // to match and get rid of angle brackets
          teamCol.push("TOT");
        } else {
          teamCol.push(
            stat
              .match(/>(.*?)</g)
              .toString()
              .replace(/[<>]/g, ""),
          );
        }
      }
    });

    // games played column
    const gamesPlayedColRaw = playerTable[5];
    let gamesPlayedCol = [];
    gamesPlayedCol.push(gamesPlayedColRaw[0]);
    gamesPlayedColRaw.forEach(stat => {
      if (stat !== gamesPlayedColRaw[0]) {
        // all items in 'gamesPlayed' column
        gamesPlayedCol.push(parseFloat(stat));
      }
    });

    // minutes per game column
    const minsPerGameColRaw = playerTable[7];
    let minsPerGameCol = [];
    minsPerGameCol.push(minsPerGameColRaw[0]);
    minsPerGameColRaw.forEach(stat => {
      if (stat !== minsPerGameColRaw[0]) {
        // all items in 'minsPerGame' column
        minsPerGameCol.push(parseFloat(stat));
      }
    });

    // total field goals per game column
    const fieldGoalsPerGameColRaw = playerTable[8];
    let fieldGoalsPerGameCol = [];
    fieldGoalsPerGameCol.push(fieldGoalsPerGameColRaw[0]);
    fieldGoalsPerGameColRaw.forEach(stat => {
      if (stat !== fieldGoalsPerGameColRaw[0]) {
        // all items in 'fieldGoalsPerGame' column
        fieldGoalsPerGameCol.push(parseFloat(stat));
      }
    });

    // total field goal attempts per game column
    const fieldGoalAttemptsPerGameColRaw = playerTable[9];
    let fieldGoalAttemptsPerGameCol = [];
    fieldGoalAttemptsPerGameCol.push(fieldGoalAttemptsPerGameColRaw[0]);
    fieldGoalAttemptsPerGameColRaw.forEach(stat => {
      if (stat !== fieldGoalAttemptsPerGameColRaw[0]) {
        // all items in 'fieldGoalAttemptsPerGame' column
        fieldGoalAttemptsPerGameCol.push(parseFloat(stat));
      }
    });

    // total field goal percentage column
    const fieldGoalPercentageColRaw = playerTable[10];
    let fieldGoalPercentageCol = [];
    fieldGoalPercentageCol.push(fieldGoalPercentageColRaw[0]);
    fieldGoalPercentageColRaw.forEach(stat => {
      if (stat !== fieldGoalPercentageColRaw[0]) {
        // all items in 'fieldGoalPercentage' column
        fieldGoalPercentageCol.push(parseFloat(stat));
      }
    });

    // 3-pointers made per game column
    const threePointersPerGameColRaw = playerTable[11];
    let threePointersPerGameCol = [];
    threePointersPerGameCol.push(threePointersPerGameColRaw[0]);
    threePointersPerGameColRaw.forEach(stat => {
      if (stat !== threePointersPerGameColRaw[0]) {
        // all items in 'threePointersPerGame' column
        threePointersPerGameCol.push(parseFloat(stat));
      }
    });

    // 3-pointers attempted per game column
    const threePointersAttemptedPerGameColRaw = playerTable[12];
    let threePointersAttemptedPerGameCol = [];
    threePointersAttemptedPerGameCol.push(
      threePointersAttemptedPerGameColRaw[0],
    );
    threePointersAttemptedPerGameColRaw.forEach(stat => {
      if (stat !== threePointersAttemptedPerGameColRaw[0]) {
        // all items in 'threePointersAttemptedPerGame' column
        threePointersAttemptedPerGameCol.push(parseFloat(stat));
      }
    });

    // 3-pointer percentage column
    const threePointerPercentageColRaw = playerTable[13];
    let threePointerPercentageCol = [];
    threePointerPercentageCol.push(threePointerPercentageColRaw[0]);
    threePointerPercentageColRaw.forEach(stat => {
      if (stat !== threePointerPercentageColRaw[0]) {
        // all items in 'threePointerPercentage' column
        threePointerPercentageCol.push(parseFloat(stat));
      }
    });

    // 2-pointers made per game column
    const twoPointersPerGameColRaw = playerTable[14];
    let twoPointersPerGameCol = [];
    twoPointersPerGameCol.push(twoPointersPerGameColRaw[0]);
    twoPointersPerGameColRaw.forEach(stat => {
      if (stat !== twoPointersPerGameColRaw[0]) {
        // all items in 'twoPointersPerGame' column
        twoPointersPerGameCol.push(parseFloat(stat));
      }
    });

    // 2-pointers attempted per game column
    const twoPointersAttemptedPerGameColRaw = playerTable[15];
    let twoPointersAttemptedPerGameCol = [];
    twoPointersAttemptedPerGameCol.push(twoPointersAttemptedPerGameColRaw[0]);
    twoPointersAttemptedPerGameColRaw.forEach(stat => {
      if (stat !== twoPointersAttemptedPerGameColRaw[0]) {
        // all items in 'twoPointersAttemptedPerGame' column
        twoPointersAttemptedPerGameCol.push(parseFloat(stat));
      }
    });

    // 2-pointer percentage column
    const twoPointerPercentageColRaw = playerTable[16];
    let twoPointerPercentageCol = [];
    twoPointerPercentageCol.push(twoPointerPercentageColRaw[0]);
    twoPointerPercentageColRaw.forEach(stat => {
      if (stat !== twoPointerPercentageColRaw[0]) {
        // all items in 'twoPointerPercentage' column
        twoPointerPercentageCol.push(parseFloat(stat));
      }
    });

    // effective field goal percentage column
    const effFieldGoalPercentageColRaw = playerTable[17];
    let effFieldGoalPercentageCol = [];
    effFieldGoalPercentageCol.push(effFieldGoalPercentageColRaw[0]);
    effFieldGoalPercentageColRaw.forEach(stat => {
      if (stat !== effFieldGoalPercentageColRaw[0]) {
        // all items in 'effFieldGoalPercentage' column
        effFieldGoalPercentageCol.push(parseFloat(stat));
      }
    });

    // free-throws made per game column
    const freeThrowsPerGameColRaw = playerTable[18];
    let freeThrowsPerGameCol = [];
    freeThrowsPerGameCol.push(freeThrowsPerGameColRaw[0]);
    freeThrowsPerGameColRaw.forEach(stat => {
      if (stat !== freeThrowsPerGameColRaw[0]) {
        // all items in 'freeThrowsPerGame' column
        freeThrowsPerGameCol.push(parseFloat(stat));
      }
    });

    // free-throws attempted per game column
    const freeThrowsAttemptedPerGameColRaw = playerTable[19];
    let freeThrowsAttemptedPerGameCol = [];
    freeThrowsAttemptedPerGameCol.push(freeThrowsAttemptedPerGameColRaw[0]);
    freeThrowsAttemptedPerGameColRaw.forEach(stat => {
      if (stat !== freeThrowsAttemptedPerGameColRaw[0]) {
        // all items in 'freeThrowsAttemptedPerGame' column
        freeThrowsAttemptedPerGameCol.push(parseFloat(stat));
      }
    });

    // free-throw percentage column
    const freeThrowPercentageColRaw = playerTable[20];
    let freeThrowPercentageCol = [];
    freeThrowPercentageCol.push(freeThrowPercentageColRaw[0]);
    freeThrowPercentageColRaw.forEach(stat => {
      if (stat !== freeThrowPercentageColRaw[0]) {
        // all items in 'freeThrowPercentage' column
        freeThrowPercentageCol.push(parseFloat(stat));
      }
    });

    // offensive rebounds per game column
    const offensiveBoardsPerGameColRaw = playerTable[21];
    let offensiveBoardsPerGameCol = [];
    offensiveBoardsPerGameCol.push(offensiveBoardsPerGameColRaw[0]);
    offensiveBoardsPerGameColRaw.forEach(stat => {
      if (stat !== offensiveBoardsPerGameColRaw[0]) {
        // all items in 'offensiveBoardsPerGame' column
        offensiveBoardsPerGameCol.push(parseFloat(stat));
      }
    });

    // defensive rebounds per game column
    const defensiveBoardsPerGameColRaw = playerTable[22];
    let defensiveBoardsPerGameCol = [];
    defensiveBoardsPerGameCol.push(defensiveBoardsPerGameColRaw[0]);
    defensiveBoardsPerGameColRaw.forEach(stat => {
      if (stat !== defensiveBoardsPerGameColRaw[0]) {
        // all items in 'defensiveBoardsPerGame' column
        defensiveBoardsPerGameCol.push(parseFloat(stat));
      }
    });

    // total rebounds per game column
    const totalBoardsPerGameColRaw = playerTable[23];
    let totalBoardsPerGameCol = [];
    totalBoardsPerGameCol.push(totalBoardsPerGameColRaw[0]);
    totalBoardsPerGameColRaw.forEach(stat => {
      if (stat !== totalBoardsPerGameColRaw[0]) {
        // all items in 'totalBoardsPerGame' column
        totalBoardsPerGameCol.push(parseFloat(stat));
      }
    });

    // assists per game column
    const assistsPerGameColRaw = playerTable[24];
    let assistsPerGameCol = [];
    assistsPerGameCol.push(assistsPerGameColRaw[0]);
    assistsPerGameColRaw.forEach(stat => {
      if (stat !== assistsPerGameColRaw[0]) {
        // all items in 'assistsPerGame' column
        assistsPerGameCol.push(parseFloat(stat));
      }
    });

    // steals per game column
    const stealsPerGameColRaw = playerTable[25];
    let stealsPerGameCol = [];
    stealsPerGameCol.push(stealsPerGameColRaw[0]);
    stealsPerGameColRaw.forEach(stat => {
      if (stat !== stealsPerGameColRaw[0]) {
        // all items in 'stealsPerGame' column
        stealsPerGameCol.push(parseFloat(stat));
      }
    });

    // blocks per game column
    const blocksPerGameColRaw = playerTable[26];
    let blocksPerGameCol = [];
    blocksPerGameCol.push(blocksPerGameColRaw[0]);
    blocksPerGameColRaw.forEach(stat => {
      if (stat !== blocksPerGameColRaw[0]) {
        // all items in 'blocksPerGame' column
        blocksPerGameCol.push(parseFloat(stat));
      }
    });

    // turnovers per game column
    const turnoversPerGameColRaw = playerTable[27];
    let turnoversPerGameCol = [];
    turnoversPerGameCol.push(turnoversPerGameColRaw[0]);
    turnoversPerGameColRaw.forEach(stat => {
      if (stat !== turnoversPerGameColRaw[0]) {
        // all items in 'turnoversPerGame' column
        turnoversPerGameCol.push(parseFloat(stat));
      }
    });

    // personal fouls per game column
    const personalFoulsPerGameColRaw = playerTable[28];
    let personalFoulsPerGameCol = [];
    personalFoulsPerGameCol.push(personalFoulsPerGameColRaw[0]);
    personalFoulsPerGameColRaw.forEach(stat => {
      if (stat !== personalFoulsPerGameColRaw[0]) {
        // all items in 'personalFoulsPerGame' column
        personalFoulsPerGameCol.push(parseFloat(stat));
      }
    });

    // points per game column
    const pointsPerGameColRaw = playerTable[29];
    let pointsPerGameCol = [];
    pointsPerGameCol.push(pointsPerGameColRaw[0]);
    pointsPerGameColRaw.forEach(stat => {
      if (stat !== pointsPerGameColRaw[0]) {
        // all items in 'pointsPerGame' column
        pointsPerGameCol.push(parseFloat(stat));
      }
    });

    // creating array of players
    for (let i = 0; i < playerCol.length; i++) {
      // object for seeding api
      let player = {
        name: playerCol[i],
        pointsPerGame: pointsPerGameCol[i],
        assistsPerGame: assistsPerGameCol[i],
        totalBoardsPerGame: totalBoardsPerGameCol[i],
        blocksPerGameCol: blocksPerGameCol[i],
        stealsPerGameCol: stealsPerGameCol[i],
      };
      if (player.name !== undefined) {
        playersArray.push(player);
      } else {
        // do nothing
      }
    }
    // return playersArray;
  },
)
  .then(res => {
    return playersArray;
  })
  .catch(err => console.log("ERROR RIGHT HERE", err));
