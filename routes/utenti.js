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
 * GET tramite id utente
 */
router.get('/:id', function (req, res) {
    utenteController.show(req, res);
});

/*
 * GET lista accessi dell'utente tramite id
 */
router.get('/listaAccessi/:id', function (req, res) {
    utenteController.listIngressi(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    utenteController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    utenteController.update(req, res);
});

/*
 * PUT aggiungi transazione
 */
router.put('/addTransazione/:id', function (req, res) { //TODO controlla
    utenteController.addTransazione(req, res);
});

/*
 * PUT aggiungi ingresso
 */
router.put('/addIngresso/:id', function (req, res) { //TODO controlla
    utenteController.addIngresso(req, res);
});

//TODO sistema aggiungi uscita
/*
 * PUT aggiungi uscita
x
router.put('/addTransazione/:id', function (req, res) {
    utenteController.addTransazione(req, res);
});
*/

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    utenteController.remove(req, res);
});

module.exports = router;
