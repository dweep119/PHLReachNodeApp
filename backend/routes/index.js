var express = require('express');
var log = require('log4js').getLogger("index");

var app = express();

var sendData = require('./sendData');
var getData = require('./getData');
var getSQLData = require('./getSQLData');
var setSQLData = require('./setSQLData');
var locations = require('./locations');
var patients = require('./patients');
var tests = require('./tests');
var register = require('./register');

app.use('/sendData', sendData);
app.use('/getData', getData);
app.use('/locations', locations);
app.use('/patients', patients);
app.use('/getSQLData', getSQLData);
app.use('/setSQLData', setSQLData);
app.use('/testList', tests);
app.use('/register', register);

/* GET home page. */
app.get('/', function (req, res, next) {
  log.debug("This is in the index module");
  res.render('index', { title: 'Express' });
});

module.exports = app;
