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

module.exports = router;
