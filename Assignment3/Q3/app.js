require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', routes);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server is running on port " + port);
})
