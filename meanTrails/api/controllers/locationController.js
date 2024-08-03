require('../models/trails')
const mongoose = require('mongoose');
const Trail = mongoose.model('Trail');
const { ObjectId } = require('mongodb');

const callBackify = require('util').callbackify;

const response = {
    status: 201,
    message: ""
}

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

const updateTrailWithCallBack = callBackify(function (trailToUpdate) {
    return trailToUpdate.save();
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
    //if (!_validateQueryString(req, res)) return;

    const offset = req.query.offset ? parseInt(req.query.offset) : process.env.DEFAULT_OFFSET;
    const count = req.query.count ? parseInt(req.query.count) : process.env.DEFAULT_COUNT;
    const totalCount = offset + count;

    const _sendResponse = function (res, response) {
        res.status(response.status).json(response.message)
    }

    getAllTrailWithCallBack(offset, totalCount, function (err, trails) {
        const response = {
            status: 201,
            message: ""
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (!trails) {
            response.status = 404;
            response.message = process.env.TRAIL_NOT_FOUND_MESSAGE;
        } else {
            response.status = 200;
            response.message = trails;
        }
        _sendResponse(res, response);
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
            response.status = 500;
            response.message = err;
        }
        if (!trail) {
            response.status = 500;
            response.message = process.env.TRAIL_NOT_FOUND_MESSAGE;
        } else {
            response.status = 200;
            response.message = process.env.DELETE_SUCCESS_MESSAGE;
        }
    });
}

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const getOneTrail = function (req, res) {

    if (!_validateObjectId(req.params.locationId, res)) return;
    const response = {
        status: 201,
        message: ""
    }
    findTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (!trail) {
            response.status = 404;
            response.message = process.env.TRAIL_NOT_FOUND_MESSAGE
        } else {
            response.status = 200;
            response.message = trail.trails;
        }
        console.log(trail.trails);
        _sendResponse(res, response);
    });
}


const fullUdateTrail = function (req, res) {

    if (!_validateObjectId(req.params.locationId, res)) return;

    //find document by id
    findTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        const response = {
            status: 204,
            message: process.env.GET_SUCCESS_MESSAGE
        }
        if (err) {
            response.status = 500;
            response.message = { message: process.env.TRAIL_NOT_FOUND_MESSAGE };
        }
        if (!trail) {
            response.status = 404;
            response.message = { message: process.env.TRAIL_NOT_FOUND_MESSAGE };
        }
        if (response.status !== 404) {

            trail.country = req.body.country;
            trail.state = req.body.state;
            trail.city = req.body.city;

            if (req.body.trails) {
                trail.trails = req.body.trails;
            }
            else {
                trail.trails = [];
            }
        }

        updateTrailWithCallBack(trail, function (err, fullUpdatedTrail) {
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

const partialUpdateTrail = function (req, res) {

    //validate document id
    if (!_validateObjectId(req.params.locationId, res)) return;

    findTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        const response = {
            status: 200,
            message: process.env.GET_SUCCESS_MESSAGE
        }
        if (err) {
            response.status = 500;
            response.message = process.env.TRAIL_NOT_FOUND_MESSAGE;
        }
        if (!trail) {
            response.status = 404;
            response.message = process.env.TRAIL_NOT_FOUND_MESSAGE;
        }

        if (req.body && req.body.country) {
            trail.country = req.body.country;
        }
        if (req.body && req.body.state) {
            trail.state = req.body.state;
        }
        if (req.body && req.body.city) {
            trail.city = req.body.city;
        }

        if (req.body.trails) {
            trail.trails = req.body.trails;
        }

        updateTrailWithCallBack(trail, function (err, trail) {
            const response = {
                status: 204,
                message: trail
            }

            if (err) {
                response.status = 500;
                response.message = process.env.UPDATE_FAILURE_MESSAGE;
            }
            if (!trail) {
                response.status = 404;
                response.message = process.env.TRAIL_NOT_FOUND_MESSAGE;
            } else {
                response.status = 200;
                response.message = process.env.UPDATE_SUCCESS_MESSAGE;
            }
            _sendResponse(res, response);
        });
    });
}

module.exports = {
    getAllTrails,
    addTrail,
    deleteTrail,
    getOneTrail,
    fullUdateTrail,
    partialUpdateTrail
};