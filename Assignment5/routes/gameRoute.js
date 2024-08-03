const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gamesController');


router.route('/games')
    .get(gameController.getAllGames);

router.route('/games/:gameId')
    .get(gameController.getGamesById)
    .patch(gameController.partialUpdateGame);


module.exports = router;