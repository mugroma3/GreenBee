var express = require('express');
var titolo = 'GreenBee';
var router = express.Router();
var magazzinoController = require('../controllers/magazzinoController');
var utenteController = require('../controllers/utenteController');

router.get('/', function (req, res) {
    res.render('index', { title: titolo, user : req.user});
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('../');
});

router.get('/storicoTransazioni', function(req, res){
    res.render('storicoTransazioni', {title: titolo, user: req.user});
});

router.get('/market', function (req, res) {
    magazzinoController.list(null, function(answer){
        if(answer[0]==200){
            res.render('market', {title: titolo, user: req.user, magazzino: answer[1]});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.get('/toDoList', function(req, res){
    res.render('toDoList', {title: titolo, user: req.user});
});

router.post('/addSale', function (req, res) {
    var options = {
        tipoTransazione : req.body.tipoTransazione,
        oggetto : req.body.oggetto,
        quantita : req.body.quantita,
        user: {id: req.user._id}
    };
    utenteController.addTransazione(options, function(answer){
        if(answer[0]==200){
            res.render('addedSale', {title: titolo, user: req.user, sale: answer[1]});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.get('/gestisciColtivazioni', function (req, res) {
    var options = {id : req.user._id};
    var magazzinos;
    magazzinoController.listAll(null,function (answer){
        if(answer[0]==200){
            magazzinos = answer[1];
        }else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
    utenteController.getColtivazioni(options, function(answer){
        if(answer[0]==200){
            res.render('gestisciColtivazioni', {title: titolo, user: req.user, coltivazioni: answer[1],magazzino: magazzinos});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.post('/addColtivazione', function (req, res) {
    var options = {
        id: req.user._id,
        ortaggio: req.body.coltivazione
    };
    utenteController.addOrtaggio(options, function(answer){
        if(answer[0]==200){
            res.render('addColtivazione', { title: titolo, user : req.user, coltivazione: options.ortaggio});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.post('/removeColtivazione', function (req, res) {
    var options = {
        id: req.user._id,
        ortaggio: req.body.coltivazione
    };
    utenteController.removeOrtaggio(options, function(answer){
        if(answer[0]==200){
            res.redirect('gestisciColtivazioni');
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});


module.exports = router;