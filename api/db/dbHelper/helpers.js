"use strict";
const db = require("../dbConfig.js");

module.exports = {
  async getPlayers() {
    return await db("Players").select();
  },

  async getPlayer(id) {
    return await db("Players")
      .where({
        id,
      })
      .select();
  },
};
