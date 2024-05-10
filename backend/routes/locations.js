var express = require('express');

var router = express.Router();

var getLocations = require("../controllers/getLocationsController");

router.get('/', function (req, res) {
    getLocations.getLocationsData(req, res);
});

module.exports = router;
