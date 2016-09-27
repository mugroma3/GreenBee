var express = require('express');
var router = express.Router();
var utenteController = require('../controllers/utenteController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    utenteController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    utenteController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    utenteController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    utenteController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    utenteController.remove(req, res);
});

module.exports = router;
