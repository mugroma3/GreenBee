var express = require('express');
var router = express.Router();
var userModel = require('../models/utenteModel');
var utenteController = require('../controllers/utenteController');
var magazzinoController = require('../controllers/magazzinoController');
var titolo = 'GreenBee';

router.get('/', function (req, res) {
    res.render('indexLogged', { title: titolo, user : req.user});
});

//TODO Tocca usare il controller non il model!!!
router.get('/userList', function (req, res) {
    userModel.find(function (err, utenti) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting magazzino.',
                error: err
            });
        } else {
            res.render('userList', { title: titolo, user : req.user, listaUtenti: utenti});
        }

    });
});

router.get('/addUser', function (req, res) {
    res.render('addUser', { title: titolo, user : req.user});
});

router.get('/sensori', function (req, res) {
    res.render('sensori', { title: titolo, user : req.user});
});

router.post('/addUser', function (req, res) {
    var options = {
        nome: req.body.nome,
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
    };
    utenteController.create(options, function(answer){
        switch (answer[0]){
            case 201: res.render('addedUser', { title: titolo, user : req.user, userAdded: answer[1]}); break;
            case 404: res.status(answer[0]).json({message:answer[1]}); break;
            case 500: res.status(answer[0]).json({message: answer[1], error: answer[2]}); break;
            default: res.status(answer[0]).json({message: answer[1], error: answer[2]}); break;
        }
    });
});

router.get('/prezzario', function (req, res) {
    magazzinoController.listAll(null, function(answer){
        if(answer[0]==200){
            res.render('prezzario', {title: titolo, user: req.user, prezzi: answer[1]});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.post('/removePrezzo', function (req, res) {
    magazzinoController.remove({id: req.body.prodotto}, function(answer){
        if(answer[0]==204){
            res.redirect('prezzario');
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.post('/addPrezzo', function (req, res) {
    var options = {
        nome: req.body.nome,
        costo: req.body.costo,
        immagine: req.body.immagine
    };
    magazzinoController.create(options, function(answer){
        if(answer[0]==201){
            res.render('addedPrezzario', { title: titolo, user : req.user, prezzo: answer[1]});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});


module.exports = router;