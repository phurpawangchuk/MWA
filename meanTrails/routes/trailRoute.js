const express = require('express');
const router = express.Router();
const trailController = require('../controllers/trailController');

router.route('/:locationId/trails')
    .get(trailController.getAllTrail)
    .post(trailController.addATrail);


router.route('/:locationId/trails/:trailId')
    .get(trailController.getOneTrail)
    .delete(trailController.deleteATrail)
    .put(trailController.updateATrail)
    .patch(trailController.partialUpdateATrail);


module.exports = router;
