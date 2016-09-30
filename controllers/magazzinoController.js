var magazzinoModel = require('../models/magazzinoModel.js');

/**
 * magazzinoController.js
 *
 * @description :: Server-side logic for managing magazzinos.
 */
module.exports = {

    /**
     * magazzinoController.list()
     */
    list: function (req, res) {
        magazzinoModel.find(function (err, magazzinos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting magazzino.',
                    error: err
                });
            }
            return res.json(magazzinos);
        });
    },

    /**
     * magazzinoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        magazzinoModel.findOne({_id: id}, function (err, magazzino) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting magazzino.',
                    error: err
                });
            }
            if (!magazzino) {
                return res.status(404).json({
                    message: 'No such magazzino'
                });
            }
            return res.json(magazzino);
        });
    },

    /**
     * magazzinoController.create()
     */
    create: function (req, res) {
        var magazzino = new magazzinoModel({
			nome : req.body.nome,
			quantita : req.body.quantita
        });

        magazzino.save(function (err, magazzino) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating magazzino',
                    error: err
                });
            }
            return res.status(201).json(magazzino);
        });
    },

    /**
     * magazzinoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        magazzinoModel.findOne({_id: id}, function (err, magazzino) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting magazzino',
                    error: err
                });
            }
            if (!magazzino) {
                return res.status(404).json({
                    message: 'No such magazzino'
                });
            }

            magazzino.nome = req.body.nome ? req.body.nome : magazzino.nome;
			magazzino.quantita = req.body.quantita ? req.body.quantita : magazzino.quantita;
			
            magazzino.save(function (err, magazzino) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating magazzino.',
                        error: err
                    });
                }

                return res.json(magazzino);
            });
        });
    },
};
