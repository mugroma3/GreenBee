var express = require('express');
var router = express.Router();
var magazzinoModel = require('../models/magazzinoModel');
var utenteController = require('../controllers/utenteController.js');

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

router.post('/addSale', function (req, res) {
    var options = {
        tipoTransazione : 'vendo',
        oggetto : req.body.oggetto,
        quantita : req.body.quantita,
        user: {id: req.user._id}
    };
    utenteController.addTransazione(options, function(answer){
        if(answer[0]==200){
            res.render('addedSale', {user: req.user, sale: answer[1]});
        } else {
            res.render('error', {message: answer[1]});
        }
    });
});

module.exports = router;