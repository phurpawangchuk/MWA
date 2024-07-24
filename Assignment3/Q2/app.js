const express = require('express');
const app = express();
require('dotenv').config();

const routes = require('./routes');

app.use('/', routes);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server running at http://localhost:", port);
});