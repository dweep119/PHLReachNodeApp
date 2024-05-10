var express = require('express');

var router = express.Router();

var log = require('log4js').getLogger("getSQLDataController");

var getSQLData = require("../controllers/getSQLDataController");

router.get('/:locationId', function (req, res) {
  console.log('locationId: ', req.params.locationId);
  log.debug("In the getSQLData module.");
  getSQLData.getEventsData(req, res);
});

router.get('/patientId/:patientId', function (req, res) {
  console.log('patientId: ', req.params.patientId);
  log.debug("In the getSQLData module.");
  getSQLData.getEventsDataByPatientId(req, res);
});

router.get('/:appointmentId/:patientId', function (req, res) {
  log.debug("In the getSQLData based on locationId and appointmentId module.");
  getSQLData.getEventsDataByAppointmentId(req, res);
});

module.exports = router;
