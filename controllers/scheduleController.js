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
        scheduleModel.find({scadenza: {$lte: Date.now()}},function (err, schedules) {
            if (err) {
                callback([500, "Error when getting schedules.", err]);
            } else {
                callback([200, schedules]);
            }
        });
    },

    /**
     * scheduleController.listAll()
     */
    listAll: function (scheduleData, callback) {
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
        scheduleModel.findOne({_id: scheduleData.id}, function (err, schedule) {
            if (err) {
                callback([500, "Error when getting schedules.", err]);
            }else{
                if (!schedule) {
                    callback([404, "No such schedule.", err]);
                }else{
                    callback([200, schedule]);
                }
            }
        });
    },

    /**
     * scheduleController.create()
     */
    create: function (scheduleData, callback) {
        var schedule = new scheduleModel(scheduleData);

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
        scheduleModel.findOne({_id: scheduleData.id}, function (err, schedule) {
            if (err) {
                callback([500, 'Error when getting schedule', err]);
                return;
            }
            if (!schedule) {
                callback([404, 'No such schedule']);
                return;
            }

            schedule.nome = scheduleData.nome ? scheduleData.nome : schedule.nome;
            schedule.ricompensa = scheduleData.ricompensa ? scheduleData.ricompensa : schedule.ricompensa;
			schedule.scadenza = scheduleData.scadenza ? scheduleData.scadenza : schedule.scadenza;
			schedule.attesa = scheduleData.attesa ? scheduleData.attesa : schedule.attesa;

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
        scheduleModel.findByIdAndRemove(scheduleData.id, function (err, utente) {
            if (err) {
                callback([500, 'Error when deleting the schedule.', err]);
            }
            else {
                callback([204, "schedule rimosso"]);
            }
        });
    }
};
