const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/meanGames");
require('../model/games');
require('../model/users');

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + process.env.DB_URL);
})