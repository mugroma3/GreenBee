var utenteModel = require('../models/utenteModel.js');
var utenteFacade = require('../facades/utenteFacade');
var REST = require('../utils/REST');

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
        var risposta = utenteFacade.create(req.body.nome, req.body.username, req.body.password, req.body.admin);
        console.log("LA risposta");
        console.log(risposta);
        return REST.generate(req, res, risposta);
    },

    /**
     * utenteController.update()
     */
    update: function (req, res) {
        return REST.generate(req, res, utenteFacade.update(req.params.id, req.body.nome, req.body.punti, req.body.admin));
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
    },

    /**
     * utenteController.addIngresso()
     */
    addIngresso: function (req, res) {
        //verifica che l'utente esista
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
            //se l'utente esiste..
            else{
                //verifica che la lista abbia almeno 1 oggetto
                if(utente.accessi.length > 0) {
                    //verifica che sia uscito l'ultima volta
                    if (utente.accessi[utente.accessi.length - 1].uscita == null) {
                        return res.status(500).json({
                            message: 'devi prima uscire'
                        })
                    }
                }

                utente.accessi.push( { 'ingresso': Date.now() } );
                utente.save(function (err, utente) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating utente.',
                            error: err
                        });
                    }
                    return res.json(utente);
                });
                }
    })},

    /**
     * utenteController.addUscita()
     */
    addUscita: function (req, res) {
        //verifica che l'utente esista
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
            //se l'utente esiste..
            else{
                //verifica che la lista abbia almeno 1 oggetto
                if(utente.accessi.length > 0) {
                    var len = utente.accessi.length;
                    //verifica che stia dentro
                    if (utente.accessi[len - 1].uscita != null) {
                        return res.status(500).json({
                            message: 'devi prima entrare'
                        })
                    }
                }else{
                    return res.status(500).json({
                        message: 'devi prima entrare'
                    });
                }

                utente.accessi[len-1].uscita = Date.now();
                utente.save(function (err, utente) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating utente.',
                            error: err
                        });
                    }
                    return res.json(utente);
                });
            }
        })},

    /**
     * utenteController.listIngressi()
     */
    listIngressi: function (req, res) {
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
            else{
                return res.json(utente.accessi);
            }

        });
    },

    /**
     * utenteController.addTransazione()
     */
    addTransazione: function (req, res) {
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
            else{
                utente.transazioni.push({
                    'tipoTransazione': req.body.tipoTransazione,
                    'oggetto': req.body.oggetto,
                    'quantita': req.body.quantita
                });
                utente.save(function (err, utente) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating utente.',
                            error: err
                        });
                    }
                    return res.json(utente);
                });
            }

        });
    }
};
