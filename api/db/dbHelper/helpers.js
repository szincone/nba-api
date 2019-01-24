const db = require('../dbConfig.js');

module.exports = {
  async getPlayers() {
    return db('Players').select();
  },

  async getPlayer(id) {
    return db('Players')
      .where({
        id,
      })
      .select();
  },
};
