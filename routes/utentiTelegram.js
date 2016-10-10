var express = require('express');
var router = express.Router();
var utenteTelegramController = require('../controllers/utenteTelegramController.js');

var REST = require('../utils/REST');

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
router.get('/listAccessi/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.listAccessi(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET lista transazioni dell'utente tramite TelegramID nell'url
 */
router.get('/listTransazioni/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.listTransazioni(options, function(answer){
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
 * PUT aggiungi Ortaggio a utente, TelegramID nell'url
 */
router.put('/addOrtaggio/:id', function (req, res) {
    var options = {id: req.params.id, ortaggio: req.body.ortaggio};
    utenteTelegramController.addOrtaggio(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET lista Orto dell'utente tramite TelegramID nell'url
 */
router.get('/listOrto/:id', function (req, res) {
    var options = {id: req.params.id};
    utenteTelegramController.getColtivazioni(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * DELETE rimuove Ortaggio dall'orto dell'utente tramite TelegramID nell'url
 */
router.put('/removeOrtaggio/:id', function (req, res) {
    var options = {id: req.params.id, ortaggio: req.body.ortaggio};
    utenteTelegramController.removeOrtaggio(options, function(answer){
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

/*
 * POST complete schedule
 *
 */
router.post('/completeSchedule/:id', function (req, res) {
    var options = {scheduleId: req.body.scheduleId, utenteId: req.params.id};
    utenteTelegramController.completeSchedule(options, function(answer){
        REST.generate(req, res, answer);
    });
});

module.exports = router;
