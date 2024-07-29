const mongoose = require('mongoose');

const trailSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 250,
        description: "Name must have inimum of 3 characters and maximum of 250 characters",
    },
    distance: {
        type: Number,
        min: 1,
        description: "Distance must be minimum of 1 mile",
    },
    difficulty: {
        type: String,
        required: true,
    }
});

const trailsSchema = mongoose.Schema({
    country: {
        type: String,
        minlength: 2,
        description: "Country name must have minimum of 2 characters.",
    },
    state: {
        type: String,
        minlength: 2,
        description: "State name must have minimum of 2 characters.",
    },
    city: {
        type: String,
        minlength: 2,
        description: "City name must have minimum of 2 characters.",
    },
    trails: [trailSchema]
})
mongoose.model('Trail', trailsSchema, 'trails');
