require('dotenv').config();
require('./dbconnection');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes/locationRoute');
const trailsRoutes = require('./routes/trailRoute');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);
app.use('/api', trailsRoutes);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server running on port", port);
})