require('dotenv').config();
const express = require('express');

const dbconnection = require('./dbconnection/dbconnection').open();

const app = express();
app.use(express.json());

const routes = require('./routes/routes');

app.use('/', routes);

let server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log('Server started at http://localhost:%s', port);
})