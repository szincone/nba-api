// import scraper data for seeding data
const { playerData } = require('../../../scraper/scraper.js');

async function getPlayerData() {
  try {
    const scraperResponse = await playerData;
    return scraperResponse;
  } catch (err) {
    throw err;
  }
}

exports.seed = async function insertPlayerData(knex) {
  const fullPlayerTable = await getPlayerData();
  try {
    await knex('Players').truncate();
    await knex('Players').insert(fullPlayerTable.slice(1, 150));
    await knex('Players').insert(fullPlayerTable.slice(150, 300));
    await knex('Players').insert(fullPlayerTable.slice(300, 450));
    if (fullPlayerTable.length - 450 <= fullPlayerTable.length) {
      await knex('Players').insert(fullPlayerTable.slice(450, 600));
    } else if (
      fullPlayerTable.length - 600 <= fullPlayerTable.length
      && fullPlayerTable.length - 600 > 0
    ) {
      await knex('Players').insert(fullPlayerTable.slice(600, 750));
    } else if (
      fullPlayerTable.length - 750 <= fullPlayerTable.length
      && fullPlayerTable.length - 750 > 0
    ) {
      await knex('Players').insert(fullPlayerTable.slice(750));
    }
  } catch (err) {
    throw err;
  }
};
