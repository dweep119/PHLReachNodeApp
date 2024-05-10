let createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var mongoose = require('mongoose');
var cors = require('cors');
var log4js = require('log4js');

var log = log4js.getLogger("app");
var app = express();
app.use(cors());


var index = require('./routes/index');
var linkShortener = require("./controllers/linkShortenerController");
const sessionHandler = require('./sessionHandler');

// This will manage our sessions
app.use(sessionHandler)
// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/new-phl', {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(() => console.log('connection succesful'))
//   .catch((err) => console.error(err));

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});


app.use('/api/v1', index);

app.get('/goto/:code', function (req, res) {
  linkShortener.redirectToURL(req, res);
});

app.get('/api/v1/setCookie', function (req, res) {
  //  .prismtravelpassport.com   secure: true
  res.send({ status: true });
});

app.get('/api/v1/getcookie', (req, res) => {
  //show the saved cookies
  console.log(req.cookies)
  res.send(req.cookies);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  log.error("Something went wrong:", err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;