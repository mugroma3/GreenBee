var express = require('express');
var router = express.Router();
var utenteTelegramController = require('../controllers/utenteTelegramController.js');

var REST = require('../utils/REST');

/*
 * GET lista tutti gli Telegram utenti
 */
router.get('/', function (req, res) {
    utenteTelegramController.list(null, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET utente tramite TelegramID  nell'url
 */
router.get('/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.show(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET l'utente è nell'orto tramite TelegramID [vero/falso]
 */
router.get('/isNellOrto/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.isNellOrto(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET lista accessi dell'utente tramite TelegramID nell'url
 */
router.get('/listaAccessi/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.listIngressi(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET lista transazioni dell'utente tramite TelegramID nell'url
 */
router.get('/listaTransazioni/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.listIngressi(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * PUT aggiungi transazione a utente, TelegramID nell'url
 */
router.put('/addTransazione/:id', function (req, res) {
    var options = {
        tipoTransazione : req.body.tipoTransazione,
        oggetto : req.body.oggetto,
        quantita : req.body.quantita,
        user: {id: req.params.id}
    };
    utenteTelegramController.addTransazione(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * PUT aggiungi ingresso a utente, TelegramID nell'url
 */
router.put('/addIngresso/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.addIngresso(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * PUT aggiungi uscita a utente, TelegramID nell'url
 *
 */
router.put('/addUscita/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.addUscita(options, function(answer){
        REST.generate(req, res, answer);
    });
});

module.exports = router;
