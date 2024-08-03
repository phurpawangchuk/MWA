const mongoose = require('mongoose');

const publisherScheme = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    established: String
});

const reviewScheme = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    review: String,
    postDate: Date,
});

const gameScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    price: Number,
    designers: [String],
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    publisher: publisherScheme,
    reviews: [reviewScheme]
});

mongoose.model('Game', gameScheme, 'games');