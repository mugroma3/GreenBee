var express = require('express');
var router = express.Router();
var scheduleController = require('../controllers/scheduleController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    scheduleController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    scheduleController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    scheduleController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    scheduleController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    scheduleController.remove(req, res);
});

module.exports = router;
