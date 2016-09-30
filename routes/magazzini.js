var express = require('express');
var router = express.Router();
var magazzinoController = require('../controllers/magazzinoController.js');
var REST = require('../utils/REST');
/*
 * GET
 */
router.get('/', function (req, res) {
    magazzinoController.list(options, function(answer){
        REST.generate(req, res, answer);
    });
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    var options = {id: req.params.id};
    magazzinoController.show(options, function(answer){
        REST.generate(req, res, answer);
    });
});

module.exports = router;
