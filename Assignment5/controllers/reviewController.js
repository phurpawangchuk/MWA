const mongoose = require('mongoose');
const Game = mongoose.model(process.env.MODEL_NAME);

const callbakify = require('util').callbackify;

const getReviewWithCallBackify = callbakify(function (gameId) {
    return Game.findById(gameId).select('reviews');
})

const getOneReviewWithCallBackify = callbakify(function (gameId, reviewId) {
    return Game.findOne(
        {
            '_id': gameId,
            'reviews._id': reviewId
        }, { 'reviews.$': 1 });
})

const findGameByIdWithCallBackify = callbakify(function (gameId) {
    return Game.findById(gameId);
})

const deteleReviewWithCallBackify = callbakify(function (gameId, reviewId) {
    return Game.updateOne(
        { '_id': gameId },
        { $pull: { 'reviews': { _id: reviewId } } }
    );
})

const saveReviewWithCallBackify = callbakify(function (game) {
    return game.save();
})

const fullUpdateReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    getReviewWithCallBackify(gameId, function (err, game) {

        if (err) {
            res.status(500).json(err);
        }
        const reviewToUpdate = game.reviews.filter(review => review.id === reviewId);
        console.log("full update");

        reviewToUpdate[0].title = req.body.title;
        reviewToUpdate[0].rating = req.body.rating;
        reviewToUpdate[0].review = req.body.review;
        reviewToUpdate[0].postDate = new Date();

        saveReviewWithCallBackify(game, function (err, game) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json({ message: process.env.UPDATE_SUCCESS_MESSAGE });
            }
        });

    });
}

const partialUpdateReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    getReviewWithCallBackify(gameId, function (err, game) {
        const gameReview = game.reviews.filter((review) => review.id === reviewId);
        // console.log("Partial gameReview " + gameReview);
        if (req.body && req.body.title)
            gameReview[0].title = req.body.title;
        if (req.body && req.body.rating)
            gameReview[0].rating = req.body.rating;
        if (req.body && req.body.review)
            gameReview[0].review = req.body.review;

        saveReviewWithCallBackify(game, function (err, game) {
            res.status(200).json(game);
        })

    })
}

const deleteReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    deteleReviewWithCallBackify(gameId, reviewId, function (err, game) {
        console.log("Deleted");
        res.status(200).json({ message: " Review deleted" });
    })
}

const addReview = function (req, res) {

    const response = { status: 204, message: '' };
    const gameId = req.params.gameId;

    console.log("Add new Review");

    findGameByIdWithCallBackify(gameId, function (err, game) {
        console.log(game);

        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (!game) {
            response.status = 404;
            response.message = { "message": "Game not found" };
        }
        else {

            const review = {
                title: req.body.title,
                rating: req.body.rating,
                review: req.body.review,
                postDate: new Date()
            }
            game.reviews.push(review);

            saveReviewWithCallBackify(game, function (err, game) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {
                    response.status = 200;
                    response.message = { message: "Review added" };
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}

const getReviews = function (req, res) {
    const response = { status: 204, message: '' };
    const gameId = req.params.gameId;

    console.log("AA ==", gameId)
    getReviewWithCallBackify(gameId, function (err, game) {
        console.log("Get All Review ", game);
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = game.reviews;
        }
        res.status(response.status).json(response.message);
    });
}

const getOneReview = function (req, res) {
    const response = { status: 204, message: '' };
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    console.log(reviewId, gameId)
    getOneReviewWithCallBackify(gameId, reviewId, function (err, game) {
        console.log("Get One Review" + game);
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { message: "No record found" };
        } else {
            response.status = 200;
            response.message = game.reviews[0];
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getReviews, getOneReview, addReview, fullUpdateReview, partialUpdateReview, deleteReview
}   