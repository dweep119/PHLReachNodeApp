var express = require('express');

var router = express.Router();

var log = require('log4js').getLogger("setSQLDataController");

var setSQLData = require("../controllers/setSQLDataController");

router.post('/', function (req, res) {
  log.debug("In the setSQLData module.");
  setSQLData.saveAppointmentData(req, res);
});

module.exports = router;
