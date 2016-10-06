var express = require('express');
var router = express.Router();
var centralinaController = require('../controllers/centralinaController.js');

var REST = require('../utils/REST');

/*
 * POST lettura centralina
 */
router.post('/', function (req, res) {
    var options = {
        name: req.body.name,
        battery_lvl: req.body.battery_lvl,
        luminosity: req.body.luminosity,
        Data: req.body.Date,
        ble_servers: req.body.ble_servers}; //TODO vedere come leggere un array

    centralinaController.create(options, function(answer){
        REST.generate(req, res, answer);
    })
});

/*
 * GET  letture
 */
router.get('/', function (req, res) {
    centralinaController.list(null, function(answer){
        REST.generate(req, res, answer);
    })
});

/*
 * GET  lettura singola TODO definire il parametro di ricerca (data?)
 */
router.get('/:id', function (req, res) {
    var temp = {name: req.param.id}
    centralinaController.list(temp, function(answer){
        REST.generate(req, res, answer);
    })
});

module.exports = router;
