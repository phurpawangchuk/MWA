const mongoose = require('mongoose');
const Game = mongoose.model(process.env.MODEL_NAME);

const callbackify = require('util').callbackify;
// const getAllWithCallBackify = callbackify(function () {
//     return Game.find();
// })

const getGameByIdWithCallBack = callbackify(function (gameId) {
    return Game.find({ '_id': Object(gameId) });
})

const findGameByIdWithCallBackify = callbackify(function (gameId) {
    return Game.find({ '_id': gameId });
})

const saveGameWithCallBacify = callbackify(function (games) {
    return games.save();
})

const getAllGames = function (req, res) {
    const response = { status: 204, message: '' };
    Game.find().then((games) => {
        response.status = 200;
        response.message = games;
        res.status(response.status).json(response.message);
    }).catch((err) => {
        response.status = 500;
        response.message = err;
        res.status(response.status).json(response.message);
    })

    // getAllWithCallBackify(function (err, games) {
    //     if (err) {
    //         response.status = 500;
    //         response.message = err;
    //     } else {
    //         response.status = 200;
    //         response.message = games;
    //     }
    //     res.status(response.status).json(response.message);
    // });
}

const getGamesById = function (req, res) {
    const response = { status: 204, message: '' };
    const gameId = req.params.gameId;
    // Game.find({ '_id': Object(gameId) }).then((game) => {
    //     response.status = 200;
    //     response.message = game[0];
    //     res.status(response.status).json(response.message);
    // }).catch((err) => {
    //     response.status = 500;
    //     response.message = err;
    //     res.status(response.status).json(response.message);
    // });

    getGameByIdWithCallBack(gameId, function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = game[0];
        }
        res.status(response.status).json(response.message);
    });
}

const partialUpdateGame = function (req, res) {
    const gameId = req.params.gameId;

    findGameByIdWithCallBackify(gameId, function (err, games) {
        if (req.body && req.body.rate) {
            games[0].rate = req.body.rate;
            console.log(games);

            saveGameWithCallBacify(games[0], function (err, games) {
                if (err) {
                    res.status(500).json({ message: err });
                } else {
                    res.status(200).json({ message: "Updated." });
                }
            })
        }

    })

}

module.exports = { getAllGames, getGamesById, partialUpdateGame };
