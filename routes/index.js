var express = require('express');
var passport = require('passport');
var router = express.Router();
var magazzinoModel = require('../models/magazzinoModel');

/* GET home page. */
router.get('/',function (req, res, next) {
        if(req.isAuthenticated())
            return next();
        res.render('index', { title: 'Express'});
    },
    function (req, res) {
        res.render('indexLogged', { title: 'Express', user : req.user});
});

router.get('/login', function(req, res){
  res.render('login', { user : req.user});
});

router.post('/login', passport.authenticate('local'), function (req, res) {
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
        magazzinoModel.find(function (err, magazzinos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting magazzino.',
                    error: err
                });
            } else {
                res.render('market', {user: req.user, magazzino: magazzinos});
            }

        });

});

module.exports = router;
