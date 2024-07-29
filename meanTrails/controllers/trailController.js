const mongoose = require('mongoose');
const Trail = mongoose.model('Trail');
const { ObjectId } = require('mongodb');

const callBackify = require('util').callbackify;

const getTrailsWithCallBack = callBackify(function (locationId) {
    return Trail.findById(locationId).select('trails');;
})

const checkTrailByIdWithCallBack = callBackify(function (locationId) {
    return Trail.findById(locationId);
})

const getOneTrailWithCallBack = callBackify(function (locationId, trailId) {
    return Trail.findOne({
        '_id': locationId,
        'trails._id': trailId
    }, { 'trails.$': 1 });
})

const checkSubDocumentByIdWithCallBack = callBackify(function (locationId, trailId) {
    return Trail.findOne({
        '_id': locationId,
        'trails._id': trailId
    }).select('trails');
})

const deleteTrailWithCallBack = callBackify(function (locationId, trailId) {
    return Trail.updateOne(
        { '_id': locationId },
        { $pull: { 'trails': { _id: trailId } } }
    );
})

const updateTrailWithCallBack = callBackify(function (locationId, trailId, trailToUpdate) {
    return Trail.updateOne(
        { '_id': locationId, 'trails._id': trailId },
        { $set: { 'trails': trailToUpdate } }
    );
})

const addNewTrailWithCallBack = callBackify(function (locationId, newTrail) {
    return Trail.updateOne(
        { '_id': locationId },
        { $push: { 'trails': newTrail } }
    );
})


const partialUpdateTrailWithCallBack = callBackify(function (locationId, trailId, trailToUpdate) {

    const updateQuery = {};
    for (let [key, value] of Object.entries(trailToUpdate)) {
        updateQuery[`trails.$.${key}`] = value;
    }

    return Trail.updateOne(
        { '_id': locationId, 'trails._id': trailId },
        { $set: updateQuery }
    );

})


///////////////////////////////////////////
// Validation

const _validateObjectId = function (trailId, res) {
    if (!ObjectId.isValid(trailId)) {
        res.status(404).json({ message: process.env.INVALID_TRAIL_ID_MESSAGE });
        return false;
    }
    return true;
}

///////////////////////////////////////////

const getAllTrail = function (req, res) {

    //validate id
    if (!_validateObjectId(req.params.locationId, res)) return;

    //retrieve sub-document
    getTrailsWithCallBack(req.params.locationId, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.GET_FAILURE_MESSAGE });
            return;
        }
        res.status(200).json(trail);
    });
}

const deleteATrail = function (req, res) {
    console.log("delete trail...");

    //validate id
    if (!_validateObjectId(req.params.locationId, res) || !_validateObjectId(req.params.trailId, res)) return;

    //check main document id
    checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        //check sub-document id
        checkSubDocumentByIdWithCallBack(trail._id, req.params.trailId, function (err, trail) {
            if (!trail) {
                res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
                return;
            }
            //delete sub-document
            _deleteTrail(trail, req.params.trailId, res);
        });
    });
}

const _deleteTrail = function (trail, trailId, res) {

    deleteTrailWithCallBack(trail._id, trailId, function (err, updatedTrail) {
        if (err) {
            res.status(500).json({ message: process.env.DELETE_FAILURE_MESSAGE });
            return;
        }
        if (updatedTrail.modifiedCount === 0) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        res.status(200).json({ message: process.env.DELETE_SUCCESS_MESSAGE });
    });
}

const updateATrail = function (req, res) {
    console.log("update trail...");

    //validate id
    if (!_validateObjectId(req.params.locationId, res) || !_validateObjectId(req.params.trailId, res)) return;

    //check main document id
    checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }

        //check sub-document id
        checkSubDocumentByIdWithCallBack(trail._id, req.params.trailId, function (err, trail) {
            if (err) {
                res.status(500).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
                return;
            }
            if (!trail) {
                res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
                return;
            }

            const trailId = req.params.trailId;
            //update sub-document
            _updateTrail(trail, trailId, req, res);
        });
    });
}

const _updateTrail = function (trail, trailId, req, res) {
    updateTrailWithCallBack(trail._id, trailId, req.body, function (err, updatedTrail) {
        if (err) {
            res.status(500).json({ message: process.env.UPDATE_FAILURE_MESSAGE + err });
            return;
        }

        res.status(200).json({ message: process.env.UPDATE_SUCCESS_MESSAGE });
    });
}

const addATrail = function (req, res) {
    console.log("add trail...");
    if (!_validateObjectId(req.params.locationId, res)) return;

    //check existence of main document id 
    checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (!trail) {
            res.status(400).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        //add sub-document
        _addNewTrail(trail, req, res);
    });
}

const _addNewTrail = function (trail, req, res) {
    // const newTrail = {
    //     name: req.body.name,
    //     distance: req.body.distance,
    //     difficulty: req.body.difficulty
    // };

    addNewTrailWithCallBack(trail._id, req.body, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.ADD_FAILURE_MESSAGE });
            return;
        }
        res.status(200).json({ message: process.env.ADD_SUCCESS_MESSAGE });
    });
}

const getOneTrail = function (req, res) {

    //validate id
    if (!_validateObjectId(req.params.locationId, res) || !_validateObjectId(req.params.trailId, res)) return;

    //check main document id
    checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }

        //check sub-document id
        checkSubDocumentByIdWithCallBack(req.params.locationId, req.params.trailId, function (err, trail) {
            if (!trail) {
                res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
                return;
            }

            // Retrieve the sub-document
            getOneTrailWithCallBack(trail._id, req.params.trailId, function (err, trail) {
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
        });
    });
}

const partialUpdateATrail = function (req, res) {
    console.log("partial update trail...");

    //validate id
    if (!_validateObjectId(req.params.locationId, res) || !_validateObjectId(req.params.trailId, res)) return;

    //check main document id
    checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }

        //check sub-document id
        checkSubDocumentByIdWithCallBack(req.params.locationId, req.params.trailId, function (err, trail) {
            if (!trail) {
                res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
                return;
            }

            const trailId = req.params.trailId;
            //update sub-document
            _partialUpdateTrail(trail, trailId, req, res);
        });
    });
}

const _partialUpdateTrail = function (trail, trailId, req, res) {
    const fieldsToUpdate = {};
    if (req.body && req.body.name !== '')
        fieldsToUpdate['name'] = req.body.name;
    if (req.body && req.body.distance !== '')
        fieldsToUpdate['distance'] = req.body.distance;
    if (req.body && req.body.difficulty !== '')
        fieldsToUpdate['difficulty'] = req.body.difficulty;

    partialUpdateTrailWithCallBack(trail._id, trailId, fieldsToUpdate, function (err, updatedTrail) {
        if (err) {
            res.status(500).json({ message: process.env.UPDATE_FAILURE_MESSAGE + err });
            return;
        }

        res.status(200).json({ message: process.env.UPDATE_SUCCESS_MESSAGE });
    });
}
module.exports = { getAllTrail, deleteATrail, updateATrail, addATrail, getOneTrail, partialUpdateATrail };

