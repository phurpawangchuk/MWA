const express = require('express');
const router = express.Router();

const trailsRouter = require('./locationRoute');
const usersRouter = require('./trailRoute');

router.use("/trails", trailsRouter);
router.use("/users", usersRouter);

module.exports = router;