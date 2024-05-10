var express = require('express');

var router = express.Router();

var getData = require("../controllers/getDataController");

router.get('/', function (req, res) {
  getData.getData(req, res);
});

module.exports = router;
