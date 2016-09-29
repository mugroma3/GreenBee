var express = require('express');
var router = express.Router();
var utenteController = require('../controllers/utenteController.js');

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
    utenteController.create(req, res);
});

/*
 * PUT update utente tramite id nell'url
 */
router.put('/:id', function (req, res) {
    utenteController.update(req, res);
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
