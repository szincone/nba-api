// import scraper data for seeding data
const players = require("../../../scraper/scraper.js");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("Players")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("Players").insert([
        { name: "Bugs", ppg: 15, apg: 5, rpg: 1, bpg: 55, spg: 14 },
      ]);
    });
};
