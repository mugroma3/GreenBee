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
    list: function (scheduleData, callback) {
        scheduleModel.find(function (err, schedules) {
            if (err) {
                callback([500, "Error when getting schedules.", err]);
            } else {
                callback([200, schedules]);
            }
        });
    },

    /**
     * scheduleController.show()
     */
    show: function (scheduleData, callback) {
        var id = req.params.id;
        scheduleModel.findOne({_id: id}, function (err, schedule) {
            if (err) {
                callback([500, "Error when getting schedules.", err]);
            }else{
                if (!schedule) {
                    callback([404, "No such schedule.", err]);
                }else{
                    callback([200, schedules]);
                }
            }
        });
    },

    /**
     * scheduleController.create()
     */
    create: function (scheduleData, callback) {
        var schedule = new scheduleModel({
			nome : scheduleData.nome,
			ultimoReset : scheduleDatay.ultimoReset,
			scadenza : scheduleData.scadenza
        });

        schedule.save(function (err, schedule) {
            if (err) {
                callback([500, "Error when creating schedule", err]);
            }else{
                callback([201, schedule]);
            }
        });
    },

    /**
     * scheduleController.update()
     */
    update: function (scheduleData, callback) {
        var id = req.params.id;
        scheduleModel.findOne({_id: id}, function (err, schedule) {
            if (err) {
                callback([500, 'Error when getting schedule', err]);
                return;
            }
            if (!schedule) {
                callback([404, 'No such schedule']);
                return;
            }

            schedule.nome = req.body.nome ? req.body.nome : schedule.nome;
			schedule.ultimoReset = req.body.ultimoReset ? req.body.ultimoReset : schedule.ultimoReset;
			schedule.scadenza = req.body.scadenza ? req.body.scadenza : schedule.scadenza;

            schedule.save(function (err, schedule) {
                if (err) {
                    callback([500, 'Error when updating schedule.', err]);
                }else {
                    callback([200, schedule]);
                }
            });
        });
    },

    /**
     * scheduleController.remove()
     */
    remove: function (scheduleData, callback) {
        scheduleModel.findByIdAndRemove(userData.id, function (err, utente) {
            if (err) {
                callback([500, 'Error when deleting the schedule.', err]);
            }
            else {
                callback([204, "schedule rimosso"]);
            }
        });
    }
};
