var express = require('express');

var router = express.Router();

var data = require("../controllers/dataController");

router.get('/', function (req, res) {
    data.sendData(req, res);
});

module.exports = router;
