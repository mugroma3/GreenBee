var express = require('express');
var router = express.Router();
var sensoreController = require('../controllers/sensoreController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    sensoreController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    sensoreController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    sensoreController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    sensoreController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    sensoreController.remove(req, res);
});

module.exports = router;
