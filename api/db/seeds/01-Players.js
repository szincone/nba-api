// import scraper data for seeding data
let { table } = require("../../../scraper/scraper.js");

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
      return getPlayerData().then(value => {
        return knex("Players").insert(value);
      });
    });
};
// end working
