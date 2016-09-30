var express = require('express');
var router = express.Router();
var utenteController = require('../controllers/utenteController.js');

var REST = require('../utils/REST');

/*
 * GET lista tutti gli utenti
 */
router.get('/', function (req, res) {
    utenteController.list(null, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET tramite id utente nell'url
 */
router.get('/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteController.show(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET l'utente è nell'orto [vero/falso]
 */
router.get('/isNellOrto/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteController.isNellOrto(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET lista accessi dell'utente tramite id nell'url
 */
router.get('/listaAccessi/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteController.listIngressi(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * POST nuovo utente (nome, username e password sono obbligatori)
 */
router.post('/', function (req, res) {
    var options = {
        nome: req.body.nome,
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
    };
    utenteController.create(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * PUT update utente tramite id nell'url
 */
router.put('/:id', function (req, res) {
    var options = {
        id: req.params.id,
        nome: req.body.nome,
        admin: req.body.admin,
        punti: req.body.punti,
        username: req.body.username,
        password: req.body.password
    };
    utenteController.update(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * PUT aggiungi transazione a utente, id nell'url
 */
router.put('/addTransazione/:id', function (req, res) {
    var userData = {
        tipoTransazione : req.body.tipoTransazione,
        oggetto : req.body.oggetto,
        quantita : req.body.quantita
    };
    userData.user.id = req.params.id;
    utenteController.addTransazione(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * PUT aggiungi ingresso a utente, id nell'url
 */
router.put('/addIngresso/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteController.addIngresso(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * PUT aggiungi uscita a utente, nell'url
 *
 */
router.put('/addUscita/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteController.addUscita(options, function(answer){
        REST.generate(req, res, answer);
    });
});

module.exports = router;
