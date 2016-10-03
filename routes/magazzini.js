var express = require('express');
var router = express.Router();
var magazzinoController = require('../controllers/magazzinoController.js');
var REST = require('../utils/REST');
/*
 * GET
 */
router.get('/', function (req, res) {
    magazzinoController.list(null, function(answer){
        REST.generate(req, res, answer);
    });
});

module.exports = router;