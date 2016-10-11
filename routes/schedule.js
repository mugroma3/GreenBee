var express = require('express');
var router = express.Router();
var scheduleController = require('../controllers/scheduleController.js');
var REST = require('../utils/REST');
/*
 * GET lista tutte le schedule
 */
router.get('/', function (req, res) {
    scheduleController.listAll(null, function(answer){
        REST.generate(req, res, answer);
    });
});

//TODO da togliere, solo per testing
/*
 * PUT update schedule tramite id nell'url
 */
router.put('/:id', function (req, res) {
    var options = {
        id: req.params.id,
        nome: req.body.nome,
        ricompensa: req.body.ricompensa,
        scadenza: req.body.scadenza,
        attesa: req.body.attesa
    };
    scheduleController.update(options, function(answer){
        REST.generate(req, res, answer);
    });
});
module.exports = router;
