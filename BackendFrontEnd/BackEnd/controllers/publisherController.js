const mongoose = require('mongoose');
const Game = mongoose.model("Game");

const callbackify = require('util').callbackify;

const getPublisherWithCallBackify = callbackify(function (gameId) {
    return Game.findById(gameId).select('publisher');
})

const findGameByIdWithCallBackify = callbackify(function (gameId) {
    return Game.findById(gameId).select('publisher');
})

const addedPublisherWithCallBackify = callbackify(function (game) {
    return game.save();
})

const savePublisherWithBackify = callbackify(function (game) {
    return game.save();
})

const getPublisher = function (req, res) {
    const response = { status: 204, message: '' };
    const gameId = req.params.gameId;

    getPublisherWithCallBackify(gameId, function (err, publisher) {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = publisher;
        }
        res.status(response.status).json(response.message);
    });
}

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const addPublisher = function (req, res) {
    const response = { status: 204, message: '' };
    const gameId = req.params.gameId;

    findGameByIdWithCallBackify(gameId, function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (!game) {
            response.status = 404;
            response.message = { "message": "Game not found" };
        }
        else {

            game.publisher = req.body;
            // game.markModified('publisher');

            addedPublisherWithCallBackify(game, function (err, addedPublisher) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {
                    response.status = 200;
                    response.message = addedPublisher;
                }
                console.log("Publisher==", game.publisher);
                _sendResponse(res, response);
            });
        }
    });
}

const partialUpdatePublisher = function (req, res) {
    const response = { status: 204, message: '' };

    const gameId = req.params.gameId;

    findGameByIdWithCallBackify(gameId, function (err, game) {

        if (req.body && req.body.name) {
            game.publisher.name = req.body.name;
        }
        if (req.body && req.body.country) {
            game.publisher.country = req.body.country;
        }
        if (req.body && req.body.location) {
            game.publisher.location = req.body.location;
        }
        if (req.body && req.body.established) {
            game.publisher.established = req.body.established;
        }

        savePublisherWithBackify(game, function (err, updatedGame) {
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.status = 200;
                response.message = updatedGame;
            }
            _sendResponse(res, response);
        });

    });
}

const fullUpdatePublisher = function (req, res) {
    const response = { status: 204, message: '' };
    const gameId = req.params.gameId;
    findGameByIdWithCallBackify(gameId, function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            game.publisher = req.body;

            savePublisherWithBackify(game, function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {
                    response.status = 200;
                    response.message = updatedGame;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}

const deletePublisher = function (req, res) {
    const response = { status: 204, message: '' };
    const gameId = req.params.gameId;
    findGameByIdWithCallBackify(gameId, function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            game.publisher = {};
            savePublisherWithBackify(game, function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {
                    response.status = 200;
                    response.message = updatedGame;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}

module.exports = { getPublisher, addPublisher, partialUpdatePublisher, deletePublisher, fullUpdatePublisher };

