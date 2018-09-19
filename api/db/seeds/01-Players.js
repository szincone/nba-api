// import scraper data for seeding data
let players = require("../../../scraper/scraper.js");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("Players")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("Players").insert(players);
    });
};
