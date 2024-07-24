const express = require('express');
const router = express.Router();

const mathOperationCtl = require('./controller');

router.route('/').get(mathOperationCtl.default);

router.route('/:number1').get(mathOperationCtl.multiple);

module.exports = router;