var express = require('express');
var router = express.Router();
var userModel = require('../models/utenteModel');
var utenteFacade = require('../facades/utenteFacade');

router.get('/', function (req, res) {
    res.render('adminIndex', { title: 'Express', user : req.user});
});

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
    //utenteFacade.create(req.body.nome, req.body.username, req.body.password, req.body.admin)
});

module.exports = router;