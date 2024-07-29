const express = require('express');
const router = express.Router();
const trailLocationController = require('../controllers/locationController');

router.route('/')
    .get(trailLocationController.getAllTrails)
    .post(trailLocationController.addTrail);

router.route('/:locationId')
    .get(trailLocationController.getOneTrail)
    .delete(trailLocationController.deleteTrail)
    .put(trailLocationController.updateTrail)
    .patch(trailLocationController.partialUpdateTrail);

module.exports = router;
