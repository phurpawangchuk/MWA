const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const routes = require('./route');

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, function () {
    console.log("Listening on port " + process.env.PORT);
});

