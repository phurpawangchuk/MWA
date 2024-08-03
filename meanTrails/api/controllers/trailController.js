const mongoose = require('mongoose');
const Trail = mongoose.model('Trail');
const { ObjectId } = require('mongodb');
const { response } = require('express');

const callBackify = require('util').callbackify;

const getTrailsWithCallBack = callBackify(function (locationId) {
    return Trail.findById(locationId).select('trails');;
})

const checkTrailByIdWithCallBack = callBackify(function (locationId) {
    return Trail.findById(locationId);
})


const findTrailByIdWithCallBack = callBackify(function (locationId) {
    return Trail.find(locationId);
})


const getOneTrailWithCallBack = callBackify(function (locationId, trailId) {
    return Trail.findOne({
        '_id': locationId,
        'trails._id': trailId
    }, { 'trails.$': 1 });
})

const checkAndGetSubDocumentByIdWithCallBack = callBackify(function (mainDocumentIdId, subDocumentId) {
    return Trail.findOne({
        '_id': mainDocumentIdId,
        'trails._id': subDocumentId
    }, { 'trails.$': 1 });
})

const deleteTrailWithCallBack = callBackify(function (locationId, trailId) {
    return Trail.updateOne(
        { '_id': locationId },
        { $pull: { 'trails': { _id: trailId } } }
    );
})

const addNewTrailWithCallBack = callBackify(function (newTrail) {
    // return Trail.updateOne(
    //     { '_id': locationId },
    //     { $push: { 'trails': newTrail } }
    // );
    return newTrail.save();
})

// const fullUpdateTrailWithCallBack = callBackify(function (locationId, trailId, trailToUpdate) {
//     return Trail.updateOne(
//         { '_id': locationId, 'trails._id': trailId },
//         { $set: { 'trails': trailToUpdate } }
//     );
// })

const fullUpdateTrailWithCallBack = callBackify(function (trailToUpdate) {
    return trailToUpdate.save();
})

const partialUpdateTrailWithCallBack = callBackify(function (trailToUpdate) {
    // const partialUpdateTrailWithCallBack = callBackify(function (locationId, trailId, trailToUpdate) {
    // const updateQuery = {};
    // for (let [key, value] of Object.entries(trailToUpdate)) {
    //     updateQuery[`trails.$.${key}`] = value;
    // }

    // return Trail.updateOne(
    //     { '_id': locationId, 'trails._id': trailId },
    //     { $set: updateQuery }
    // );

    return trailToUpdate.save();
})

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

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

    const subTrailId = req.params.trailId;
    const trailId = req.params.locationId;
    //validate id
    if (!_validateObjectId(req.params.locationId, res) || !_validateObjectId(subTrailId, res)) return;

    //check main document id
    checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (!trail) {
            res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
            return;
        }
        deleteTrailWithCallBack(trailId, subTrailId, function (err, trail) {
            if (err) {
                res.status(500).json({ message: "Error encounterred to delete" });
            }
            res.status(200).json({ message: "Deleted" });
        })
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
    const newTrail = {
        name: req.body.name,
        distance: req.body.distance,
        difficulty: req.body.difficulty
    };
    trail.trails.push(newTrail);

    addNewTrailWithCallBack(trail, function (err, trail) {
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
        checkAndGetSubDocumentByIdWithCallBack(req.params.locationId, req.params.trailId, function (err, trail) {
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

const fullUpdateTrail = function (req, res) {
    console.log("update trail...");

    let response = {
        status: 402,
        message: ''
    }
    //validate id
    // if (!_validateObjectId(req.params.locationId, res) || !_validateObjectId(req.params.trailId, res)) return;

    const mainDocumentId = req.params.locationId;
    const subDocumentId = req.params.trailId;
    //check sub-document trails and get sub-document by id
    // getOneTrailWithCallBack(mainDocumentId, subDocumentId, function (err, trail) {
    checkAndGetSubDocumentByIdWithCallBack(mainDocumentId, function (err, trail) {
        if (err) {
            response.status = 500;
            response.message = process.env.GET_FAILURE_MESSAGE;
        }
        if (!trail) {
            response.status = 404;
            response.message = process.env.TRAIL_NOT_FOUND_MESSAGE;
        } else {

            console.log("aaa..." + trail);
            trail = trail.trails.filter(trail => trail._id === subDocumentId);

            console.log("subTrail..." + trail);

            //update sub-document
            trail.trails = req.body;

            console.log("AAA bbb..." + trail);

            // fullUpdateTrailWithCallBack(trail, function (err, updatedTrail) {
            //     if (err) {
            //         response.status = 500;
            //         response.message = err;
            //     } else {
            //         response.status = 200;
            //         response.message = updatedTrail;
            //     }
            //     console.log("saved  ..." + updatedTrail);
            // });
        }

        _sendResponse(res, response);
    });
}

const _fullUpdateTrail = function (trail, req, res) {

    // trail.trails.name = req.body.name;
    // trail.trails.distance = req.body.distance;
    // trail.trails.difficulty = req.body.difficulty;

    console.log("After full update trail..." + trail);

    //fullUpdateTrailWithCallBack(trail._id, trailId, req.body, function (err, updatedTrail) {


}

const partialUpdateTrail = function (req, res) {
    console.log("partial update trail...");

    //validate id
    if (!_validateObjectId(req.params.locationId, res) || !_validateObjectId(req.params.trailId, res)) return;

    //check main document id
    checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (!trail) {
            response.status = 404;
            response.message = process.env.TRAIL_NOT_FOUND_MESSAGE;
        }

        const trailId = req.params.trailId;
        _partialUpdateTrail(trail, trailId, req, res);
    });
}

const _partialUpdateTrail = function (trail, trailId, req, res) {

    const trailToUpdate = trail.trails.filter((trail) => trail.id === trailId);

    if (req.body && req.body.name)
        trailToUpdate[0].name = req.body.name;
    if (req.body && req.body.distance)
        trailToUpdate[0].distance = req.body.distance;
    if (req.body && req.body.difficulty)
        trailToUpdate[0].difficulty = req.body.difficulty;

    partialUpdateTrailWithCallBack(trail, function (err, trail) {
        if (err) {
            res.status(500).json({ message: process.env.UPDATE_FAILURE_MESSAGE + err });
            return;
        }

        res.status(200).json({ message: process.env.UPDATE_SUCCESS_MESSAGE });
    });
}

module.exports = { getAllTrail, deleteATrail, fullUpdateTrail, addATrail, getOneTrail, partialUpdateTrail };

