var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');

var email = require('./routes/email-sent');

var recruit = require('./routes/recruit');
var newrecruit = require('./routes/newrecruit');
var submissions = require('./routes/submissions');

var employees = require('./routes/employees');
var employees = require('./routes/newemployee');

var newofferletter = require('./routes/newofferletter');

var contracts = require('./routes/contracts');
var newcontract = require('./routes/newcontract');

var applications = require('./routes/applications');
var newapplication = require('./routes/newapplication');

var tests = require('./routes/tests');
var newtest = require('./routes/newtest');

var preferences = require('./routes/preferences');

var applicationview = require('./routes/applicationview');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/email-sent', email);

app.use('/recruit', recruit);
app.use('/recruit/new', newrecruit);
app.use('/recruit/my-recruitment-plan', submissions);

app.use('/employees', employees);
app.use('/employees/new', employees);

app.use('/offer-letter/new', newofferletter);

app.use('/contracts', contracts);
app.use('/contracts/new', newcontract);

app.use('/applications', applications);
app.use('/applications/new', newapplication);

app.use('/tests', tests);
app.use('/tests/new', newtest);

app.use('/preferences', preferences);

app.use('/j-consulting/applications/jenfni39rf39fjmc', applicationview);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
