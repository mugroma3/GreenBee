var express = require('express');
var router = express.Router();
var userModel = require('../models/utenteModel');
var utenteController = require('../controllers/utenteController');
var prezzarioController = require('../controllers/prezzarioController');

router.get('/', function (req, res) {
    res.render('adminIndex', { title: 'Express', user : req.user});
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
            res.render('userList', { title: 'Express', user : req.user, listaUtenti: utenti});
        }

    });
});

router.get('/addUser', function (req, res) {
    res.render('addUser', { title: 'Express', user : req.user});
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
            case 201: res.render('addedUser', { title: 'Utente Aggiunto', user : req.user, userAdded: answer[1]}); break;
            case 404: res.status(answer[0]).json({message:answer[1]}); break;
            case 500: res.status(answer[0]).json({message: answer[1], error: answer[2]}); break;
            default: res.status(answer[0]).json({message: answer[1], error: answer[2]}); break;
        }
    });
});

router.get('/prezzario', function (req, res) {
    prezzarioController.list(null, function(answer){
        if(answer[0]==200){
            res.render('prezzario', {user: req.user, prezzi: answer[1]});
        } else {
            res.render('error', {message: answer[1], status: answer[2]});
        }
    });
});

router.post('/removePrezzo', function (req, res) {
    prezzarioController.remove({id: req.body.prodotto}, function(answer){
        if(answer[0]==204){
            res.redirect('prezzario');
        } else {
            res.render('error', {message: answer[1], status: answer[2]});
        }
    });
});

router.post('/addPrezzo', function (req, res) {
    var options = {
        prodotto: req.body.prodotto,
        costo: req.body.costo
    };
    prezzarioController.create(options, function(answer){
        if(answer[0]==201){
            res.render('addedPrezzario', { title: 'Express', user : req.user, prezzo: answer[1]});
        } else {
            res.render('error', {message: answer[1], status: answer[2]});
        }
    });
});


module.exports = router;