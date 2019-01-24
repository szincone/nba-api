const express = require('express');
const helpers = require('../db/dbHelper/helpers.js');

const router = express.Router();

// start get requests
router.get('/', (req, res, next) => {
  helpers
    .getPlayers()
    .then((players) => {
      res.status(200).json(players);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  helpers
    .getPlayer(id)
    .then((player) => {
      res.status(200).json(player);
    })
    .catch((err) => {
      next(err);
    });
});
// end get requests

module.exports = router;
