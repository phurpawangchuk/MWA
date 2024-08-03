require('dotenv').config();
require('./api/dbconnection');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./api/routes');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use('/api', routes);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server running on port", port);
})