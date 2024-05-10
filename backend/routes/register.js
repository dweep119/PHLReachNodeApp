var express = require('express');

var router = express.Router();

var registerData = require("../controllers/registerPatientController");

router.post('/', function (req, res) {
  registerData.savePatientData(req, res);
});

module.exports = router;
