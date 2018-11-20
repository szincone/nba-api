// import scraper data for seeding data
let { table } = require("../../../scraper/scraper.js");

async function getPlayerData() {
  try {
    let response = await table;
    return response;
  } catch (err) {
    console.log("ERROR", err);
    throw err;
  }
}

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex("Players")
//     .truncate()
//     .then(function() {
//       // Inserts seed entries
//       return getPlayerData().then(value => {
//         return knex("Players").insert(value.slice(1, 100));
//       });
//     });
// };
// end working
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("Players")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return getPlayerData().then(value => {
        return knex("Players")
          .insert(value.slice(1, 100))
          .then(function() {
            return knex("Players").insert(value.slice(101, 200));
          });
      });
    });
};
