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
getPlayerData().then(value => console.log("VALUE", value[450]));
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
          .insert(value.slice(1, 150))
          .then(function() {
            return knex("Players")
              .insert(value.slice(150, 300))
              .then(function() {
                return knex("Players")
                  .insert(value.slice(300, 450))
                  .then(function() {
                    if (value.length - 450 <= value.length) {
                      return knex("Players").insert(value.slice(450, 600));
                    }
                  })
                  .then(function() {
                    if (
                      value.length - 600 <= value.length &&
                      value.length - 600 > 0
                    ) {
                      return knex("Players").insert(value.slice(600, 750));
                    }
                  })
                  .then(function() {
                    if (
                      value.length - 750 <= value.length &&
                      value.length - 750 > 0
                    ) {
                      return knex("Players").insert(value.slice(750));
                    }
                  });
              });
          });
      });
    });
};
