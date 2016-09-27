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
    list: function (req, res) {
        prezzarioModel.find(function (err, prezzarios) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting prezzario.',
                    error: err
                });
            }
            return res.json(prezzarios);
        });
    },

    /**
     * prezzarioController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        prezzarioModel.findOne({_id: id}, function (err, prezzario) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting prezzario.',
                    error: err
                });
            }
            if (!prezzario) {
                return res.status(404).json({
                    message: 'No such prezzario'
                });
            }
            return res.json(prezzario);
        });
    },

    /**
     * prezzarioController.create()
     */
    create: function (req, res) {
        var prezzario = new prezzarioModel({			prodotto : req.body.prodotto,			costo : req.body.costo
        });

        prezzario.save(function (err, prezzario) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating prezzario',
                    error: err
                });
            }
            return res.status(201).json(prezzario);
        });
    },

    /**
     * prezzarioController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        prezzarioModel.findOne({_id: id}, function (err, prezzario) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting prezzario',
                    error: err
                });
            }
            if (!prezzario) {
                return res.status(404).json({
                    message: 'No such prezzario'
                });
            }

            prezzario.prodotto = req.body.prodotto ? req.body.prodotto : prezzario.prodotto;			prezzario.costo = req.body.costo ? req.body.costo : prezzario.costo;			
            prezzario.save(function (err, prezzario) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating prezzario.',
                        error: err
                    });
                }

                return res.json(prezzario);
            });
        });
    },

    /**
     * prezzarioController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        prezzarioModel.findByIdAndRemove(id, function (err, prezzario) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the prezzario.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
