var utenteModel = require('../models/utenteModel');
var scheduleController = require('./scheduleController');
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
            }else{
                callback([200, utentes]);
            }
        });
    },

    /**
     * utenteController.show()
     */
    show: function (userData, callback) {
        utenteModel.findOne({_id: userData.id},{password:0,
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
            }else{
                callback([201, utente]);
            }
        });
    },

    /**
     * utenteController.update()
     */
    update: function (userData, callback) {
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
                return;
            }
            if (!utente) {
                callback([404, 'No such utente']);
                return;
            }
            utente.admin = userData.admin ? userData.admin : utente.admin;
            utente.nome = userData.nome ? userData.nome : utente.nome;
            utente.username = userData.username ? userData.username : utente.username;
            utente.password = userData.password ? userData.password : utente.password;
            utente.punti = userData.punti ? userData.punti : utente.punti;
            utente.accessi = userData.accessi ? userData.accessi : utente.accessi;
            utente.transazioni = userData.transazioni ? userData.transazioni : utente.transazioni;
            utente.telegramID = userData.telegramID ? userData.telegramID : utente.telegramID;
            utente.save(function (err, utente) {
                if (err) {
                    callback([500, 'Error when updating utente.', err]);
                }else {
                    callback([200, utente]);
                }
            });
        });
    },

    /**
     * utenteController.remove()
     */
    removeUtente: function (userData, callback) {
        utenteModel.findByIdAndRemove(userData.id, function (err, utente) {
            if (err) {
                callback([500, 'Error when deleting the utente.', err]);
            }
            else {
                callback([204, "utente rimosso"]);
            }
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
        utenteModel.findOne({_id: userData.user.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
                return;
            }
            if (!utente) {
                callback([404, 'No such utente']);
                return;
            }
            magazzinoController.findByName({nome: userData.oggetto}, function (anwser) {
                if (anwser[0] > 299) { //Significa che ho un codice http maggiore di 299, quindi un codice di errore
                    callback([anwser[0], anwser[1]]);
                    return;
                }
                if (utente.punti >= anwser[1].costo * (dati.quantita*(-1))) {
                    var magazzino = anwser[1];
                    if (magazzino.quantita + dati.quantita >= 0) {
                        magazzino.quantita += (dati.quantita - 0);
                        magazzino.save(function (err, magazzino) {
                            if (err) {
                                callback([500, "Error when updating magazzino.", err]);
                                return;
                            }else{
                                var lastTrans = {
                                    'tipoTransazione': userData.tipoTransazione,
                                    'oggetto': userData.oggetto,
                                    'quantita': userData.quantita
                                };
                                utente.transazioni.push(lastTrans);
                                utente.punti += anwser[1].costo * dati.quantita;
                                utente.save(function (err) {
                                    if (err) {
                                        //DB Sminchiato
                                        callback([500, 'Error when updating utente', err]);
                                    } else {
                                        callback([200, lastTrans]);
                                    }
                                });
                            }
                        });
                    } else {
                        callback([500, "Errore, non vi sono abbastanza oggetti in magazzino"]);
                        return;
                    }
                } else {
                    callback([500, "Non sei abbastanza ricco!"]);
                    return;
                }
            });
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
    },

    /**
     * utenteController.completeSchedule()
     */
    completeSchedule: function (userData, callback) {
        utenteModel.findOne({_id: userData.utenteId}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
                return;
            }
            if (!utente) {
                callback([404, 'No such utente']);
                return;
            }
            scheduleController.show({id: userData.scheduleId}, function (anwser) {
                if (anwser[0] > 299) { //Significa che ho un codice http maggiore di 299, quindi un codice di errore
                    callback([anwser[0], anwser[1]]);
                    return;
                }
                var schedule = anwser[1];
               // schedule.
            });
        });
    }
};
