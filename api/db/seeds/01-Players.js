// import scraper data for seeding data
// let players = require("../../../scraper/scraper.js");

// working export below
// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex("Players")
//     .truncate()
//     .then(function() {
//       // Inserts seed entries
//       return knex("Players").insert({
//         name: "Alex Abrines",
//         pointsPerGame: 6,
//         assistsPerGame: 0.6,
//         totalBoardsPerGame: 1.3,
//         blocksPerGameCol: 0.1,
//         stealsPerGameCol: 0.5,
//       });
//     });
// };
// end working

// import scraper data for seeding data
let { table } = require("../../../scraper/scraper.js");
// table
//   .then(value => {
//     // alex abrines stats displaying below
//     console.log("VALUE", value[1]);
//     // console.log("Players Array", playersArray);
//   })
//   .catch(err => console.log("ERROR RIGHT HERE", err));

async function getPlayerData() {
  try {
    let response = await table;
    console.log("RESPONSE", response);
    return response;
  } catch (e) {
    console.log("ERROR", e);
    throw e;
  }
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("Players")
    .truncate()
    .then(function() {
      // Inserts seed entries
      getPlayerData().then(value => {
        return knex("Players").insert(value);
      });
    });
};
// end working

// getPlayerData().then(value => {
//   console.log("VALUE)", value);
//   // return knex("Players")
//   //   .truncate()
//   //   .then(function() {
//   //     console.log("VALUE", value);
//   //     // Inserts seed entries
//   //     if (value.length === 0) {
//   //     }
//   //     return knex("Players").insert(value);
//   //   });
// });
