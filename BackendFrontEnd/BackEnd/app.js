const express = require('express');
const app = express();
require('dotenv').config();
require('./dbconnection/index');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200/', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// Enable all CORS requests
// app.use("/api", function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//     next();
// });

const gameRoute = require('./routes/gameRoute');
const publisherRoute = require('./routes/publisherRoute');
const reviewRoute = require('./routes/reviewRoute');
const userRoute = require('./routes/userRoute');

app.use("/api", gameRoute);
app.use('/api', publisherRoute);
app.use('/api', reviewRoute);
app.use("/api", userRoute);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log(`App is running on port ${port}`);
})

