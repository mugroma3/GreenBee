var prezzarioModel = require('../models/prezzarioModel.js');

/**
 * prezzarioController.js
 *
 * @description :: Server-side logic for managing prezzarios.
 */
module.exports = {

    /**
     * prezzarioController.list()
     */
    list: function (userData, callback) {
        prezzarioModel.find(function (err, prezzarios) {
            if (err) {
                callback([500, "Error when getting prezzario.", err]);
            }
            callback([200, prezzarios]);
        });
    },

    /**
     * prezzarioController.show()
     */
    show: function (userData, callback) {
        prezzarioModel.findOne({_id: userData.id}, function (err, prezzario) {
            if (err) {
                callback([500, "Error when getting prezzario.", err]);
            }
            if (!prezzario) {
                callback([404, 'No such prezzario']);
            }
            callback([200, prezzario]);
        });
    },

    /**
     * prezzarioController.create()
     */
    create: function (userData, callback) { 
        var prezzario = new prezzarioModel(userData);
        prezzario.save(function (err, prezzario) {
            if (err) {
                callback([500, "Error when creating prezzario", err]);
            }
            callback([201, prezzario]);
        });
    },

    /**
     * prezzarioController.updateCosto()
     */
    updateCosto: function (userData, callback) {
        prezzarioModel.findOne({_id: userData.id}, function (err, prezzario) {
            if (err) {
                callback([500, 'Error when getting prezzario', err]);
            }
            if (!prezzario) {
                callback([404, 'No such prezzario']);
            }

            prezzario.costo = userData.costo ? userData.costo : prezzario.costo;

            prezzario.save(function (err, prezzario) {
                if (err) {
                    callback([500, 'Error when updating prezzario.', err]);
                }
                callback([200, prezzario]);
            });
        });
    },

    /**
     * prezzarioController.remove()
     */
    remove: function (userData, callback) {
        prezzarioModel.findByIdAndRemove(userData.id, function (err, prezzario) {
            if (err) {
                callback([500, 'Error when deleting the prezzario.', err]);
            }
            callback([204]);
        });
    }
};
