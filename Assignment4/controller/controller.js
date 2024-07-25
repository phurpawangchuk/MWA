require('dotenv').config();
require('../dbconnection/dbconnection').open();
const { ObjectId } = require('mongodb');
const dbconnection = require('../dbconnection/dbconnection');

const callBackify = require('util').callbackify;


const gamesCollection_getAllRecordLimitWithCallback = callBackify(function (offset, count) {
    const db = dbconnection.get();
    const gamesCollection = db.collection(process.env.COLLECTION_NAME);
    return gamesCollection.find().skip(offset).limit(count).toArray();
});

const gamesCollection_addGameRecordWithCallback = callBackify(function (newGame) {
    const db = dbconnection.get();
    const gamesCollection = db.collection(process.env.COLLECTION_NAME);
    return gamesCollection.insertOne(newGame);
});

const gamesCollection_deleteRecordWithCallBack = callBackify(function (gameId) {
    const db = dbconnection.get();
    const gamesCollection = db.collection(process.env.COLLECTION_NAME);
    return gamesCollection.deleteOne({ _id: new ObjectId(gameId) });
});


const gamesCollection_getOneRecordWithCallBack = callBackify(function (gameId) {
    const db = dbconnection.get();
    const gamesCollection = db.collection(process.env.COLLECTION_NAME);
    return gamesCollection.findOne({ _id: new ObjectId(gameId) });
});

const getAllRecordLimit = function (req, res) {
    let offset = 0;
    let count = 3;
    let maxCount = 7;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (offset + count > maxCount) {
        count = maxCount - offset;
    }
    gamesCollection_getAllRecordLimitWithCallback(offset, offset + count, function (err, games) {
        res.json(games);
    });
}

const getOneRecord = function (req, res) {
    const gameId = req.params.gameId;
    gamesCollection_getOneRecordWithCallBack(gameId, function (err, game) {
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ "message": "Game not found" });
        }
    });
}

const addGameRecord = function (req, res) {
    const title = req.body.title;
    const price = req.body.price;
    const minPlayers = req.body.minPlayers;
    const minAge = req.body.minAge;

    const newGame = {
        title: title,
        price: price,
        minPlayers: minPlayers,
        minAge: minAge
    };

    let errors = [];

    if (req.body && req.body.title === '') {
        errors.push("Title cannot be empty");
    }
    if (req.body.price === '') {
        errors.push("Price cannot be empty");
    }
    if (req.body.minPlayers < 1 || req.body.minPlayers > 10) {
        errors.push("Minimum number of players must be between 1 and 10");
    }
    if (req.body.minAge < 7 || req.body.minAge > 99) {
        errors.push("Minimum age must be between 7 and 99");
    }


    if (errors.length > 0) {
        return res.status(400).json({ errors });
    } else {
        gamesCollection_addGameRecordWithCallback(newGame, function (err, result) {
            if (result.insertedCount == 0) {
                res.status(500).json({ "message": "Failed to add the game" });
                return;
            }
            res.status(200).json({ "message": "Game added successfully" });
        });
    }
}

const deleteGameRecord = function (req, res) {
    const gameId = req.params.gameId;
    gamesCollection_deleteRecordWithCallBack(gameId, function (err, result) {
        if (result.detedCount > 0) {
            res.status(200).json({ "message": "Game deleted successfully" });
            return;
        };
        res.status(404).json({ "message": "Game not found." });
    });
}

module.exports = { getAllRecordLimit, addGameRecord, deleteGameRecord, getOneRecord };