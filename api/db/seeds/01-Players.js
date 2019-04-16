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
  let [startSlice, stopSlice, counter] = [1, 150, fullPlayerTable.length];
  try {
    while (counter > 0) {
      // eslint-disable-next-line no-await-in-loop
      await knex('Players').insert(
        fullPlayerTable.slice(startSlice, stopSlice),
      );
      startSlice += 50;
      stopSlice += 50;
      counter -= 100;
    }
  } catch (err) {
    throw err;
  }
};
