const express = require('express');
const router = express.Router();
const gameController = require('../controller/controller');

router.route('/')
    .get(gameController.getAllRecordLimit)
    .post(gameController.addGameRecord);

router.route('/:gameId')
    .get(gameController.getOneRecord)

router.route("/:gameId")
    .delete(gameController.deleteGameRecord);

module.exports = router;