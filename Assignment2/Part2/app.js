const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

app.get('/', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/index.html"));
});

app.post('/', function (req, res) {
    console.log("POST request");
    res.status(200).send("{name: 'Alice', age: 25}");
});

app.get('/index1', function (req, res) {
    res.status(200).sendFile(__dirname + "/index1.html");
});

app.get('/index2', function (req, res) {
    res.status(200).sendFile(__dirname + "/index2.html");
});

app.listen(8484, function () {
    console.log("Listening on port " + 8484);
});



