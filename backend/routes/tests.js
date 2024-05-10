var express = require('express');

var router = express.Router();

var testsData = require("../controllers/testListBasedOnLocationController");

router.get('/:locationId', function (req, res) {
  testsData.getTestDataBaesdOnLocation(req, res);
});

router.get('/', function (req, res) {
  testsData.getTestData(req, res);
});

module.exports = router;
