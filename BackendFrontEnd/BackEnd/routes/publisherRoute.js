const express = require('express');
const router = express.Router();

const publisherController = require('../controllers/publisherController');

router.route('/games/:gameId/publishers')
    .get(publisherController.getPublisher)
    .post(publisherController.addPublisher)
    .put(publisherController.fullUpdatePublisher)
    .patch(publisherController.partialUpdatePublisher)
    .delete(publisherController.deletePublisher);

module.exports = router;