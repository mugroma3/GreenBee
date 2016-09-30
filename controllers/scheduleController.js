var scheduleModel = require('../models/scheduleModel.js');

/**
 * scheduleController.js
 *
 * @description :: Server-side logic for managing schedules.
 */
module.exports = {

    /**
     * scheduleController.list()
     */
    list: function (req, res) {
        scheduleModel.find(function (err, schedules) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting schedule.',
                    error: err
                });
            }
            return res.json(schedules);
        });
    },

    /**
     * scheduleController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        scheduleModel.findOne({_id: id}, function (err, schedule) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting schedule.',
                    error: err
                });
            }
            if (!schedule) {
                return res.status(404).json({
                    message: 'No such schedule'
                });
            }
            return res.json(schedule);
        });
    },

    /**
     * scheduleController.create()
     */
    create: function (req, res) {
        var schedule = new scheduleModel({			nome : req.body.nome,			ultimoReset : req.body.ultimoReset,			scadenza : req.body.scadenza
        });

        schedule.save(function (err, schedule) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating schedule',
                    error: err
                });
            }
            return res.status(201).json(schedule);
        });
    },

    /**
     * scheduleController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        scheduleModel.findOne({_id: id}, function (err, schedule) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting schedule',
                    error: err
                });
            }
            if (!schedule) {
                return res.status(404).json({
                    message: 'No such schedule'
                });
            }

            schedule.nome = req.body.nome ? req.body.nome : schedule.nome;			schedule.ultimoReset = req.body.ultimoReset ? req.body.ultimoReset : schedule.ultimoReset;			schedule.scadenza = req.body.scadenza ? req.body.scadenza : schedule.scadenza;			
            schedule.save(function (err, schedule) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating schedule.',
                        error: err
                    });
                }

                return res.json(schedule);
            });
        });
    },

    /**
     * scheduleController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        scheduleModel.findByIdAndRemove(id, function (err, schedule) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the schedule.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
