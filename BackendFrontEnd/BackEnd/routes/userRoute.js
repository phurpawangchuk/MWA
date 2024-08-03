const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.route('/users')
    .post(userController.registerUser);

router.route('/users/login')
    .post(userController.login);

module.exports = router;