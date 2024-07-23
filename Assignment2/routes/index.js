
const express = require("express");
const router = express.Router();
const path = require("path");

router.route("/")
    .get(function (req, res) {
        res.status(200).sendFile(path.join(__dirname, "../public", "index.html"));
    });

router.route("/json")
    .get(function (req, res) {
        console.log("JSON received")
        res.status(200).json({ "message": "Hello World from test", "json": true });
    });

router.route("/hello")
    .get(function (req, res) {
        console.log("GET received")
        res.status(200).send("GET Hello World");
    })
    .post(function (req, res) {
        console.log("POST received")
        res.status(200).send("POST Hello World");
    });



module.exports = router;