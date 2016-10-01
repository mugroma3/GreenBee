var express = require('express');
var router = express.Router();
var prezzarioController = require('../controllers/prezzarioController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    prezzarioController.list(null, function(answer){
        REST.generate(req, res, answer);
    });
});

module.exports = router;
