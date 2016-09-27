var centralinaModel = require('../models/centralinaModel.js');

/**
 * centralinaController.js
 *
 * @description :: Server-side logic for managing centralinas.
 */
module.exports = {

    /**
     * centralinaController.list()
     */
    list: function (req, res) {
        centralinaModel.find(function (err, centralinas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting centralina.',
                    error: err
                });
            }
            return res.json(centralinas);
        });
    },

    /**
     * centralinaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        centralinaModel.findOne({_id: id}, function (err, centralina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting centralina.',
                    error: err
                });
            }
            if (!centralina) {
                return res.status(404).json({
                    message: 'No such centralina'
                });
            }
            return res.json(centralina);
        });
    },

    /**
     * centralinaController.create()
     */
    create: function (req, res) {
        var centralina = new centralinaModel({			ph : req.body.ph,			irraggiamentoSolare : req.body.irraggiamentoSolare,			batteria : req.body.batteria,			temperatura : req.body.temperatura,			data : req.body.data
        });

        centralina.save(function (err, centralina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating centralina',
                    error: err
                });
            }
            return res.status(201).json(centralina);
        });
    },

    /**
     * centralinaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        centralinaModel.findOne({_id: id}, function (err, centralina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting centralina',
                    error: err
                });
            }
            if (!centralina) {
                return res.status(404).json({
                    message: 'No such centralina'
                });
            }

            centralina.ph = req.body.ph ? req.body.ph : centralina.ph;			centralina.irraggiamentoSolare = req.body.irraggiamentoSolare ? req.body.irraggiamentoSolare : centralina.irraggiamentoSolare;			centralina.batteria = req.body.batteria ? req.body.batteria : centralina.batteria;			centralina.temperatura = req.body.temperatura ? req.body.temperatura : centralina.temperatura;			centralina.data = req.body.data ? req.body.data : centralina.data;			
            centralina.save(function (err, centralina) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating centralina.',
                        error: err
                    });
                }

                return res.json(centralina);
            });
        });
    },

    /**
     * centralinaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        centralinaModel.findByIdAndRemove(id, function (err, centralina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the centralina.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
