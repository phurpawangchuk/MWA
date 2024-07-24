const { json } = require('express');
const jsonData = require('../data.json');

const getAllRecords = (req, res) => {
    res.status(200).json(jsonData)
}

const getOneRecord = function (req, res) {
    const id = req.params._id;
    res.status(200).json(jsonData.filter(data => data._id['$oid'] == id));
}

module.exports = {
    getAllRecords,
    getOneRecord
}