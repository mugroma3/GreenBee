var express = require('express');
var passport = require('passport');
var router = express.Router();
var titolo ='GreenBee';

/* GET home page. */
router.get('/',function (req, res) {
	if(req.isAuthenticated()) {
		res.redirect('/user');
  	} else {
		res.render('index', { title: titolo});
  	}
});

router.get('/login', function(req, res){
  res.render('login', {title: titolo, user : req.user});
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/user');
});

module.exports = router;
