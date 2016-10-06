var express = require('express');
var router = express.Router();
var centralinaController = require('../controllers/centralinaController.js');

var REST = require('../utils/REST');

/*
 * POST lettura centralina
 */
router.post('/:id', function (req, res) {
        var options = {name: req.param.id,
            battery_lvl: req.body.battery_lvl,
            luminosity: req.body.luminosity,
            Data: req.body.Date,
            ble_servers: req.body.ble_servers}; //TODO vedere come leggere un array
    centralinaController.create(options, function(answer){
        REST.generate(req, res, answer);
    })
});

module.exports = router;
