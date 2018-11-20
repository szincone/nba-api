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
getPlayerData().then(value => {
  console.log("VALUE", value[1], value.length);
});
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
