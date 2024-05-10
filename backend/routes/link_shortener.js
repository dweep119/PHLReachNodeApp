var express = require('express');

var router = express.Router();

var linkShortener = require("../controllers/linkShortenerController");

router.get('/:code', function (req, res) {
  linkShortener.redirectToURL(req, res);
});

module.exports = router;
