var express = require('express');
var router = express.Router();
var magazzinoModel = require('../models/magazzinoModel');

router.get('/', function (req, res) {
    res.render('indexLogged', { title: 'Express', user : req.user});
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/market', function (req, res) {
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