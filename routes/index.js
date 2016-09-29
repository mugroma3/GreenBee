var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user : req.user});
});

router.get('/login', function(req, res){
  res.render('login', { user : req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/market',
    function (req, res, next) {
      if(req.isAuthenticated())
        return next();
      res.redirect('/login');
    },
    function (req, res) {
      res.render('market', {user: req.user});
});

module.exports = router;
