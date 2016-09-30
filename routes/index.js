var express = require('express');
var passport = require('passport');
var router = express.Router();


/* GET home page. */
router.get('/',function (req, res, next) {
    res.render('index', { title: 'Express'});
});

router.get('/login', function(req, res){
  res.render('login', { user : req.user});
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/user');
});

module.exports = router;
