var express = require('express');

var router = express.Router();

var getPatientsData = require("../controllers/getPatientsDataController");

router.get('/:name', function (req, res) {
  getPatientsData.getPatientsData(req, res);
});

router.get('/id/:patientId', function (req, res) {
  getPatientsData.getPatientsDataBasedOnId(req, res);
});

module.exports = router;
