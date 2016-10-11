var express = require('express');
var router = express.Router();
var utenteController = require('../controllers/utenteController');
var scheduleController = require('../controllers/scheduleController.js');
var magazzinoController = require('../controllers/magazzinoController');
var titolo = 'GreenBee';

router.get('/', function (req, res) {
    res.render('index', { title: titolo, user : req.user});
});

router.get('/userList', function (req, res) {
    utenteController.list(null, function (answer) {
        if(answer[0]==200){
            res.render('userList', {title: titolo, user: req.user, listaUtenti: answer[1]});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.get('/addUser', function (req, res) {
    res.render('addUser', { title: titolo, user : req.user});
});

router.post('/updateUser', function (req, res) {
    var options = {id: req.body.utenteId};
    utenteController.show(options, function(answer){
        if(answer[0]==200){
            res.render('updateUser', { title: titolo, user : req.user, utenteSelezionato: answer[1]});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.post('/updatedUser', function (req, res) {
    var options = {
        id: req.body.utenteId,
        nome: req.body.nome,
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin,
        telegramID: req.body.telegramID
    };
    console.log(options);
    utenteController.update(options, function(answer){
        if(answer[0]==200){
            res.render('updatedUser', { title: titolo, user : req.user});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.get('/sensori', function (req, res) {
    res.render('sensori', { title: titolo, user : req.user});
});

router.post('/addUser', function (req, res) {
    var options = {
        nome: req.body.nome,
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin,
        telegramID: req.body.telegramID
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
        immagine: req.files.immagine
    };

    magazzinoController.create(options, function(answer){
        if(answer[0]==201){
            res.render('addedPrezzario', { title: titolo, user : req.user, prezzo: answer[1]});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.post('/removeUtente', function (req, res) {
    var options = {id: req.body.utenteId};
    utenteController.removeUtente(options, function(answer){
        if(answer[0]==204){
            res.redirect('/admin/userList');
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.get('/toDoListAdmin', function(req, res){
    scheduleController.listAll(null,function (answer) {
        if(answer[0]==200){
            res.render('toDoListAdmin',{title: titolo, user: req.user, toDoList: answer[1]});
        }else{
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});
router.post('/addSchedule', function (req, res) {
    var options = {
        nome: req.body.nome,
        ricompensa: req.body.ricompensa,
        scadenza : Date.now()+(req.body.attesa*24*60*60*1000),
        attesa : req.body.attesa
    };
    scheduleController.create(options, function(answer){
        if(answer[0]==201){
            res.render('addedSchedule', { title: titolo, user : req.user, schedule: answer[1]});
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

router.post('/removeSchedule', function (req, res) {
    scheduleController.remove({id: req.body.schedule}, function(answer){
        if(answer[0]==204){
            res.redirect('toDoListAdmin');
        } else {
            res.render('error', {title: titolo, message: answer[1], status: answer[2]});
        }
    });
});

module.exports = router;