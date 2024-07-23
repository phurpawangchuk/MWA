const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const routes = require("./routes");

app.use("/", routes);

app.use(function (req, res, next) {
    console.log("Request: " + req.method + " " + new Date());
    console.log("Request: " + req.url + " " + new Date());
    next();
});


app.use(express.static(path.join(__dirname, "public")));

//Express middlewares
//Sequence or order of route matters
//Express middlewares are built on http , it didnot reinvent the wheel
//All of these are express middle ware

//Non-termination express middle ware REST are all terminating middleware
//use case is like Authorization, AOP, Apsect, etc

/*
app.use(function (req, res, next) {
    console.log("Request: " + req.method + " " + new Date());
    console.log("Request: " + req.url + " " + new Date());
    next();
});

//subset routing for css only
app.use("/static/css", function (req, res, next) {
    console.log("Request: " + req.method);
    console.log("Request: " + req.url + " " + new Date());
    next();
});


//static subfolder - use static server
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/file", function (req, res) {
    console.log("FIle received")
    //check window OS and do accordingly
    //    res.status(200).sendFile(__dirname + "/app17.js"); // windown // max = \
    //res.status(200).sendFile(path.join(__dirname + "/app17.js"));
    // res.status(200).sendFile(path.join(__dirname, "/app17.js")); //workds on all OS
    res.status(200).sendFile(path.join(__dirname, "public", "index.html")); //workds on all OS

});

*/


// app.set("port", env.env.PORT || 3000);
// app.get("port")

const server = app.listen(process.env.PORT, function () {
    const portNumber = server.address().port;  //process.env.PORT || 3000;
    console.log("Listening  on port " + portNumber);
});

