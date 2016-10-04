var utenteModel = require('../models/utenteModel');

var magazzinoController = require('./magazzinoController');
/**
 * utenteController.js
 *
 * @description :: Server-side logic for managing utentes.
 */
module.exports = {

    /**
     * utenteController.list()
     */
    list: function (userData, callback) {
        utenteModel.find(null, {password:0,
                                __v:0,
                                ultimoAccesso:0,
                                transazioni:0,
                                accessi:0,
                                orto:0},
                                function (err, utentes) {
            if (err) {
                callback([500, "Error when getting utenti.", err]);
            }
            callback([200, utentes]);
        });
    },

    /**
     * utenteController.show()
     */
    show: function (userData, callback) {
        utenteModel.findOne({_id: userData.id},{password:0,
                                                _id:0,
                                                __v:0,
                                                ultimoAccesso:0,
                                                transazioni:0,
                                                accessi:0},
                                                function (err, utente) {
            if (err) {
                callback([500, "Error when getting utente.", err]);
            }
            else{
                if (!utente) {
                    callback([404, 'No such utente']);
                }
                else{
                    callback([200, utente]);
                }
            }

        });
    },
    /**
    *utenteController.getColtivazioni()
    * */
    getColtivazioni: function (userData, callback) {
        utenteModel.findOne({_id: userData.id},{_id:0,
                                                username:0,
                                                password:0,
                                                admin:0, nome:0,
                                                telegramID:0,
                                                punti:0,
                                                ultimoAccesso:0,
                                                accessi:0,
                                                transazioni:0},
                                                function (err, utente) {
            if (err) {
                callback([500, "Error when getting utente.", err]);
            }
            if (!utente) {
                callback([404, 'No such utente']);
            }
            callback([200, utente.orto]);
        });
    },

    /**
     * utenteController.isNellOrto()
     */
    isNellOrto: function (userData, callback) {
        utenteModel.count({_id: userData.id, ultimoAccesso: null}, function (err, numUtenti) {
            if (err) {
                callback([500, "Error when getting utente.", err]);
            }
            if (numUtenti == 0 ) {
                callback([200, true]);
            }
            else{
                callback([200, false]);
            }
        });
    },

    /**
     * utenteController.create()
     */
    create: function (userData, callback) { 
        var utente = new utenteModel(userData);

        utente.save(function (err, utente) {
            if (err) {
                callback([500, "Error when creating utente", err]);
            }
            callback([201, utente]);
        });
    },

    /**
     * utenteController.update()
     */
    update: function (userData, callback) {
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
            }
            if (!utente) {
                callback([404, 'No such utente']);
            }
            utente.admin = userData.admin ? userData.admin : utente.admin;
            utente.nome = userData.nome ? userData.nome : utente.nome;
            utente.punti = userData.punti ? userData.punti : utente.punti;
            utente.accessi = userData.accessi ? userData.accessi : utente.accessi;
            utente.transazioni = userData.transazioni ? userData.transazioni : utente.transazioni;
            utente.telegramID = userData.telegramID ? userData.telegramID : utente.telegramID;
            utente.save(function (err, utente) {
                if (err) {
                    callback([500, 'Error when updating utente.', err]);
                }

                callback([200, utente]);
            });
        });
    },

    /**
     * utenteController.remove()
     */
    remove: function (userData, callback) {
        utenteModel.findByIdAndRemove(userData.id, function (err, utente) {
            if (err) {
                callback([500, 'Error when deleting the utente.', err]);
            }
            callback([204]);
        });
    },

    /**
     * utenteController.addIngresso()
     */
    addIngresso: function (userData, callback) {
        //verifica che l'utente esista
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente.', err]);
            }
            if (!utente) {
                callback([404, 'Utente inesistente', err]);
            }
            else{
                //l'utente è nell'orto?
                if(utente.isNellOrto()){
                    callback([500, 'Errore, utente dentro l\'orto']);
                }
                else{
                    var tmp = utente.accessi.create({'ingresso': Date.now()});
                    utente.ultimoAccesso = tmp._id;
                    utente.accessi.push(tmp);
                    utente.save(function (err, utente) {
                        if (err) {
                            callback([500, 'Errore nel salvataggio', err]);
                        }
                        callback([200, utente]);
                    });
                }
            }
        })
    },

    /**
     * utenteController.addUscita()
     */
    addUscita: function (userData, callback) {
        //verifica che l'utente esista
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente.', err]);
            }
            if (!utente) {
                callback([404, 'Utente inesistente']);
            }
            else{
                //l'utente è nell'orto?
                if(!utente.isNellOrto()){
                    callback([500, 'Errore, utente fuori dall\'orto']);
                } else {
                    utente.accessi.id(utente.ultimoAccesso).uscita = Date.now();
                    //resetto l'ultimo accesso
                    utente.ultimoAccesso = null;
                    utente.save(function (err, utente) {
                        if (err) {
                            callback([500, 'Errore, nell\'inserimento']);
                        }
                        callback([200, utente]);
                    });
                }
            }
        })},

    /**
     * utenteController.listAccessi()
     */
    listAccessi: function (userData, callback) {
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
            }
            if (!utente) {
                callback([404, 'No such utente']);
            }
            else{
                callback([200, utente.accessi]);
            }

        });
    },

    /**
     * utenteController.addTransazione()
     */
    addTransazione: function (userData, callback) {
        var dati;
        switch(userData.tipoTransazione){
            case 'vendo': dati = {'nome': userData.oggetto,'quantita': userData.quantita}; break;
            case 'acquisto' : dati = {'nome': userData.oggetto,'quantita': userData.quantita*(-1)}; break;
            default : callback([500, 'Tipo transazione non valido']); return;
        };
        magazzinoController.updateQuantita(dati, function(anwser){
            if(anwser[0]<299){ //Significa che ho un codice http minore di 299, quindi un codice di OK
                utenteModel.findOne({_id: userData.user.id}, function (err, utente) {
                    if (err) {
                        //DB Sminchiato
                        callback([500, 'Error when getting utente', err]);
                    }
                    if (!utente) {
                        //DB Sminchiato
                        callback([404, 'No such utente']);
                    }
                    else{
                        utente.transazioni.push({
                            'tipoTransazione': userData.tipoTransazione,
                            'oggetto': userData.oggetto,
                            'quantita': userData.quantita
                        });
                        utente.save(function (err, utente) {
                            if (err) {
                                //DB Sminchiato
                                callback([500, 'Error when updating utente', err]);
                            } else {
                                callback([200, utente]);
                            }
                        });
                    }
                });
            } else {
                callback([anwser[0], anwser[1]]);
            }
        });
    },

    /**
     * utenteController.listTransazioni()
     */
    listTransazioni: function (userData, callback) {
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
            }
            if (!utente) {
                callback([404, 'No such utente']);
            }
            else{
                callback([200, utente.transazioni]);
            }
        });
    },

    /**
     * utenteController.addOrtaggio()
     */
    addOrtaggio: function (userData, callback) {
        utenteModel.update(
            {_id: userData.id},
            {$addToSet: {orto: userData.ortaggio}}, function(err, data){
                if(err){
                    callback([500, 'Error when updating utente.', err]);
                }
                callback([200, data]);
        });
    },

    /**
     * utenteController.removeOrtaggio()
     */
    removeOrtaggio: function (userData, callback) {
        utenteModel.update(
            {_id: userData.id},
            {$pull: {orto: userData.ortaggio}}, function(err, data){
                if(err){
                    callback([500, 'Error when updating utente.', err]);
                }
                callback([200, data]);
        });
    }
};
