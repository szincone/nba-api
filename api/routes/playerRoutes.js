const express = require('express');
const helpers = require('../db/dbHelper/helpers.js');

const router = express.Router();
const { responseStatus } = require('./responseStatus.js');

// gets
router.get('/', async (req, res, next) => {
  try {
    const players = await helpers.getPlayers();
    res.status(responseStatus.success).json(players);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const player = await helpers.getPlayer(id);
    if (player.length > 0) {
      res.status(responseStatus.success).json(player);
    } else {
      responseStatus.code = responseStatus.notFound;
      next(responseStatus);
    }
  } catch (err) {
    next(err);
  }
});
// end gets

module.exports = router;
