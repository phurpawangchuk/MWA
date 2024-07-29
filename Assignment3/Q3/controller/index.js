const studentData = require('../data/school.json');

const getAllStudents = function (req, res) {
    res.status(200).json(studentData)
}

const getStudent = function (req, res) {
    const indexId = req.params.indexId;
    res.status(200).json(studentData[indexId]);
}

module.exports = {
    getAllStudents,
    getStudent
}