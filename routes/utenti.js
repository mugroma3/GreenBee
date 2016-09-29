var express = require('express');
var router = express.Router();
var utenteController = require('../controllers/utenteController.js');

var REST = require('../utils/REST');

/*
 * GET lista tutti gli utenti
 */
router.get('/', function (req, res) {
    utenteController.list(req, res);
});

/*
 * GET tramite id utente nell'url
 */
router.get('/:id', function (req, res) {
    utenteController.show(req, res);
});

/*
 * GET lista accessi dell'utente tramite id nell'url
 */
router.get('/listaAccessi/:id', function (req, res) {
    utenteController.listIngressi(req, res);
});

/*
 * POST nuovo utente (nome, username e password obbligatori)
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
    utenteController.addTransazione(req, res);
});

/*
 * PUT aggiungi ingresso a utente, id nell'url
 */
router.put('/addIngresso/:id', function (req, res) {
    utenteController.addIngresso(req, res);
});

/*
 * PUT aggiungi uscita a utente, nell'url
 *
 */
router.put('/addUscita/:id', function (req, res) {
    utenteController.addUscita(req, res);
});


/*
 * DELETE dell'untente tramite id, nell'url
 */
router.delete('/:id', function (req, res) {
    utenteController.remove(req, res);
});

module.exports = router;
