const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
require('../model/games');

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + process.env.DB_URL);
})