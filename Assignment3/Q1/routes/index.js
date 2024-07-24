const express = require('express');
const router = express.Router();
const gameController = require('../controller');

router.route("/")
    .get(gameController.getAllRecords)

router.route("/getOne/:_id")
    .get(gameController.getOneRecord)

module.exports = router;