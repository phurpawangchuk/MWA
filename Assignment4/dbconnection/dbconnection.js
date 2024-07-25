const mongoCLient = require('mongodb').MongoClient;
require('dotenv').config();

let _connection = null;

const callBackify = require('util').callbackify;
const mongoCLientConnectWithCallback = callBackify(function (url) {
    return mongoCLient.connect(url);
});

const open = function () {
    if (get() == null) {
        mongoCLientConnectWithCallback(process.env.DB_URL, function (err, client) {
            if (err) {
                console.log("DB connection failed");
                return;
            } else {
                _connection = client.db(process.env.DB_NAME);
                console.log("DB connected");
            }
        });
    }
}


const get = function () {
    return _connection;
}


module.exports = { open, get };