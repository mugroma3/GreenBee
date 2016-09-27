var express = require('express');
var router = express.Router();
var magazzinoController = require('../controllers/magazzinoController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    magazzinoController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    magazzinoController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    magazzinoController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    magazzinoController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    magazzinoController.remove(req, res);
});

module.exports = router;
