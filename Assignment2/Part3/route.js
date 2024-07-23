const express = require('express');
const router = express.Router();
const path = require('path');

router.route("/")
    .get(function (req, res) {
        res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
    })
module.exports = router;