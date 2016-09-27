var utenteModel = require('../models/utenteModel.js');

/**
 * utenteController.js
 *
 * @description :: Server-side logic for managing utentes.
 */
module.exports = {

    /**
     * utenteController.list()
     */
    list: function (req, res) {
        utenteModel.find(function (err, utentes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting utente.',
                    error: err
                });
            }
            return res.json(utentes);
        });
    },

    /**
     * utenteController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        utenteModel.findOne({_id: id}, function (err, utente) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting utente.',
                    error: err
                });
            }
            if (!utente) {
                return res.status(404).json({
                    message: 'No such utente'
                });
            }
            return res.json(utente);
        });
    },

    /**
     * utenteController.create()
     */
    create: function (req, res) {
        var utente = new utenteModel({			admin : req.body.admin,			nome : req.body.nome,			punti : req.body.punti,			accessi : req.body.accessi,			transazioni : req.body.transazioni
        });

        utente.save(function (err, utente) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating utente',
                    error: err
                });
            }
            return res.status(201).json(utente);
        });
    },

    /**
     * utenteController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        utenteModel.findOne({_id: id}, function (err, utente) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting utente',
                    error: err
                });
            }
            if (!utente) {
                return res.status(404).json({
                    message: 'No such utente'
                });
            }

            utente.admin = req.body.admin ? req.body.admin : utente.admin;			utente.nome = req.body.nome ? req.body.nome : utente.nome;			utente.punti = req.body.punti ? req.body.punti : utente.punti;			utente.accessi = req.body.accessi ? req.body.accessi : utente.accessi;			utente.transazioni = req.body.transazioni ? req.body.transazioni : utente.transazioni;			
            utente.save(function (err, utente) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating utente.',
                        error: err
                    });
                }

                return res.json(utente);
            });
        });
    },

    /**
     * utenteController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        utenteModel.findByIdAndRemove(id, function (err, utente) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the utente.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
