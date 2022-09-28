
/* module is used for generating errors for Node.js applications
   to install express
   to use path
   use body-parser for parsing the incoming request bodies
   use cookieParser parses cookies attached to the client request object
   Morgan is a middleware for nodejs that logs HTTP requests and is commonly used in express 
   to set the port number*/ 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// const http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = process.env.PORT || 3000;
/* to specfiy the router path*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//  to use express
var app = express();

// view engine setup and template language to jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// listen to the port 3000
app.listen(port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// to specify the contents to be loaded from angular build folder pasted in public
app.use(express.static(path.join(__dirname, 'public/login-updated')));

app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
// export to make it available wherever import is needed
module.exports = app;
