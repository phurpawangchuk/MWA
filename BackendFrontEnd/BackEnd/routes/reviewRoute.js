const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.route('/games/:gameId/reviews')
    .get(reviewController.getReviews)
    .post(reviewController.addReview);


router.route('/games/:gameId/reviews/:reviewId')
    .get(reviewController.getOneReview)
    .put(reviewController.fullUpdateReview)
    .patch(reviewController.partialUpdateReview)
    .delete(reviewController.deleteReview);

module.exports = router;