const express = require('express');
const helpers = require('../db/dbHelper/helpers.js');

const router = express.Router();

// gets
router.get('/', async (req, res, next) => {
  try {
    const players = await helpers.getPlayers();
    res.status(200).json(players);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const player = await helpers.getPlayer(id);
    res.status(200).json(player);
  } catch (err) {
    next(err);
  }
});
// end gets

module.exports = router;
