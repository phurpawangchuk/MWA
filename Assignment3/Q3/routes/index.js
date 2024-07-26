const express = require('express');
const router = express.Router();

const studentController = require('../controller');

router.route('/').get(studentController.getAllStudents);

router.route('/:indexId').get(studentController.getStudent);

module.exports = router;