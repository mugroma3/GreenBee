var express = require('express');
var router = express.Router();
var centralinaController = require('../controllers/centralinaController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    centralinaController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    centralinaController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    centralinaController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    centralinaController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    centralinaController.remove(req, res);
});

module.exports = router;
