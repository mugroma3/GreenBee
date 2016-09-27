var sensoreModel = require('../models/sensoreModel.js');

/**
 * sensoreController.js
 *
 * @description :: Server-side logic for managing sensores.
 */
module.exports = {

    /**
     * sensoreController.list()
     */
    list: function (req, res) {
        sensoreModel.find(function (err, sensores) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting sensore.',
                    error: err
                });
            }
            return res.json(sensores);
        });
    },

    /**
     * sensoreController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        sensoreModel.findOne({_id: id}, function (err, sensore) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting sensore.',
                    error: err
                });
            }
            if (!sensore) {
                return res.status(404).json({
                    message: 'No such sensore'
                });
            }
            return res.json(sensore);
        });
    },

    /**
     * sensoreController.create()
     */
    create: function (req, res) {
        var sensore = new sensoreModel({			nome : req.body.nome,			idBluetooth : req.body.idBluetooth,			data : req.body.data,			umidita : req.body.umidita,			batteria : req.body.batteria
        });

        sensore.save(function (err, sensore) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating sensore',
                    error: err
                });
            }
            return res.status(201).json(sensore);
        });
    },

    /**
     * sensoreController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        sensoreModel.findOne({_id: id}, function (err, sensore) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting sensore',
                    error: err
                });
            }
            if (!sensore) {
                return res.status(404).json({
                    message: 'No such sensore'
                });
            }

            sensore.nome = req.body.nome ? req.body.nome : sensore.nome;			sensore.idBluetooth = req.body.idBluetooth ? req.body.idBluetooth : sensore.idBluetooth;			sensore.data = req.body.data ? req.body.data : sensore.data;			sensore.umidita = req.body.umidita ? req.body.umidita : sensore.umidita;			sensore.batteria = req.body.batteria ? req.body.batteria : sensore.batteria;			
            sensore.save(function (err, sensore) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating sensore.',
                        error: err
                    });
                }

                return res.json(sensore);
            });
        });
    },

    /**
     * sensoreController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        sensoreModel.findByIdAndRemove(id, function (err, sensore) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the sensore.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
