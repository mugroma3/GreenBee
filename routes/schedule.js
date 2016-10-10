var express = require('express');
var router = express.Router();
var scheduleController = require('../controllers/scheduleController.js');
var REST = require('../utils/REST');
/*
 * GET lista tutte le schedule
 */
router.get('/', function (req, res) {
    scheduleController.list(null, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET tramite id schedule nell'url
 */
router.get('/:id', function (req, res) {
    var options = {id: req.params.id};
    scheduleController.show(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * POST nuovo schedule (nome e scadenza sono obbligatori)
 */
router.post('/', function (req, res) {
    var options = {
        nome: req.body.nome,
        ricompensa: req.body.ricompensa,
        ultimoReset : Date.now(),
        scadenza : req.body.scadenza
    };
    scheduleController.create(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * PUT
 */
/*
router.put('/:id', function (req, res) {
    scheduleController.update(req, res);
});
*/

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    scheduleController.remove(req, res);
});

module.exports = router;
