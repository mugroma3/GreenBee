var express = require('express');
var router = express.Router();
var prezzarioController = require('../controllers/prezzarioController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    prezzarioController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    prezzarioController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    prezzarioController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    prezzarioController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    prezzarioController.remove(req, res);
});

module.exports = router;
