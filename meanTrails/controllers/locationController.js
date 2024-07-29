require('../models/trails')
const mongoose = require('mongoose');
const Trail = mongoose.model('Trail');
const { ObjectId } = require('mongodb');

const callBackify = require('util').callbackify;

const getAllTrailWithCallBack = callBackify(function (offset, count) {
    return Trail.find().skip(offset).limit(count);
})

const addTrailWithCallBack = callBackify(function (newTrail) {
    return Trail.create(newTrail);
})

const deleteTrailWithCallBack = callBackify(function (locationId) {
    return Trail.findByIdAndDelete(locationId);
})

const findTrailByIdWithCallBack = callBackify(function (locationId) {
    return Trail.findById(locationId);
})

const updateTrailWithCallBack = callBackify(function (locationId, trailToUpdate) {
    return Trail.findByIdAndUpdate(locationId, trailToUpdate);
})


///////////////////////////////////////////
// Validation
///////////////////////////////////////////

const _validateObjectId = function (locationId, res) {
    if (!ObjectId.isValid(locationId)) {
        res.status(404).json({ message: process.env.INVALID_TRAIL_ID_MESSAGE });
        return false;
    }
    return true;
}

const _validateQueryString = function (req, res) {

    if (req.query.offset && req.query.offset < 0 || req.query.offset && isNaN(req.query.offset)) {
        res.status(404).json({ message: process.env.INVALID_OFFSET_MESSAGE });
        return false;
    }

    if (req.query.count && req.query.count < 0 || req.query.count && isNaN(req.query.count)) {
        res.status(404).json({ message: process.env.INVALID_COUNT_MESSAGE });
        return false;
    }

    return true;
}

///////////////////////////////////////////
const getAllTrails = function (req, res) {

    // Validate query string
    if (!_validateQueryString(req, res)) return;

    const offset = req.query.offset ? parseInt(req.query.offset) : process.env.DEFAULT_OFFSET;
    const count = req.query.count ? parseInt(req.query.count) : process.env.DEFAULT_COUNT;
    const totalCount = offset + count;

    getAllTrailWithCallBack(offset, totalCount, function (err, trails) {
        if (err) {
            res.status(500).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        if (!trails) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }

        const result = trails.length > 0 ? trails : { message: process.env.TRAIL_EMPTY_MESSAGE };
        res.status(200).json(result);
    });
}

const addTrail = function (req, res) {
    const newTrailLocation = {
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        trails: []
    };

    addTrailWithCallBack(newTrailLocation, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.ADD_FAILURE_MESSAGE, 'error': err.message });
            return;
        }
        res.status(200).json({ message: process.env.ADD_SUCCESS_MESSAGE });
    });
}

const deleteTrail = function (req, res) {

    //validate document id
    if (!_validateObjectId(req.params.locationId, res)) return;

    deleteTrailWithCallBack(req.params.locationId, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.DELETE_FAILURE_MESSAGE, 'error': err.message });
            return;
        }
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        res.status(200).json({ message: process.env.DELETE_SUCCESS_MESSAGE });
    });
}

const updateTrail = function (req, res) {

    if (!_validateObjectId(req.params.locationId, res)) return;

    updateTrailWithCallBack(req.params.locationId, req.body, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.UPDATE_FAILURE_MESSAGE });
            return;
        }
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        res.status(200).json({ message: process.env.UPDATE_SUCCESS_MESSAGE });
    });
}

const getOneTrail = function (req, res) {

    if (!_validateObjectId(req.params.locationId, res)) return;

    findTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        res.status(200).json(trail);
    });
}

const partialUpdateTrail = function (req, res) {

    //valisate document id
    if (!_validateObjectId(req.params.locationId, res)) return;


    findTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }

        updateTrailWithCallBack(req.params.locationId, req.body, function (err, trail) {
            if (err) {
                res.status(500).json({ message: process.env.UPDATE_FAILURE_MESSAGE });
                return;
            }
            if (!trail) {
                res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
                return;
            }
            res.status(200).json({ message: process.env.UPDATE_SUCCESS_MESSAGE });
        });
    });
}

module.exports = {
    getAllTrails,
    addTrail,
    deleteTrail,
    getOneTrail,
    updateTrail,
    partialUpdateTrail
};