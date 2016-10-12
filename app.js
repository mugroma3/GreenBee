var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ortoBioDB'); //Localhost/nomeDB

function defaultContentTypeMiddleware (req, res, next) {
  req.headers['content-type'] = req.headers['content-type'] || 'application/json';
  if(req.headers['content-type'] == 'application/javascript'){
    req.headers['content-type']='application/json';
    next();
  } else {
    next();
  }
}




var routes = require('./routes/index');
var api = require('./routes/apiRoutes');
var routesAdmin = require('./routes/adminRoutes');
var routesUser = require('./routes/userRoutes');

var app = express();

var passport = require('passport');
var expressSession = require('express-session');
var localStrategy = require('passport-local').Strategy;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(defaultContentTypeMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

//Configure Passport
app.use(expressSession({secret: 'MugLab',
                        resave: false,
                        saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.use('/admin', function(req,res,next){
  if(req.isAuthenticated()) {
    if (req.user.admin) {
      return next();
    }
  }
  res.redirect('/');
});
app.use('/admin', routesAdmin);

app.use('/user', function(req,res,next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
});
app.use('/user', routesUser);

api.setApp(app);  //setting rest-api calls

//passport config
var utenteModel = require('./models/utenteModel');
passport.use(new localStrategy(
    function(username, password, done){
      utenteModel.findOne({username: username},{_id:0, admin:0, nome:0, telegramID:0, punti:0, ultimoAccesso:0, accessi:0, transazioni:0, orto:0}, function (err, utente) {
        if (err) {
          return done(err)
        }
        if (!utente) {
          return done(null, false);
        }
        if(!utente.verifyPassword(password)){
          return done(null, false);
        }
        return done(null, utente);
      });
    }
));

passport.serializeUser(utenteModel.serializeUser());
passport.deserializeUser(utenteModel.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
