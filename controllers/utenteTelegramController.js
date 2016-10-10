var utenteModel = require('../models/utenteModel');

var magazzinoController = require('./magazzinoController');
/**
 * utenteController.js
 *
 * @description :: Server-side logic for managing Telegram's utentes.
 */
module.exports = {

    /**
     * utenteTelegramController.show()
     */
    show: function (userData, callback) {
        utenteModel.findOne({telegramID: userData.id},{ password:0,
                                                        username:0,
                                                        punti:0,
                                                        ultimoAccesso:0,
                                                        accessi:{$slice: 5},
                                                        transazioni:{$slice: 5}},
                                                        function (err, utente) {
            if (err) {
                callback([500, "Error when getting utente.", err]);
            }else {
                if (!utente) {
                    callback([404, 'No such utente']);
                } else {
                    callback([200, utente]);
                }
            }
        });
    },

    getColtivazioni: function (userData, callback) {
        utenteModel.findOne({telegramID: userData.id},{ _id:0,
                                                        username:0,
                                                        password:0,
                                                        admin:0,
                                                        nome:0,
                                                        punti:0,
                                                        ultimoAccesso:0,
                                                        //telegramID:0,
                                                        accessi:0,
                                                        transazioni:0},
                                                        function (err, utente) {
            if (err) {
                callback([500, "Error when getting utente.", err]);
            }else{
                if (!utente) {
                    callback([404, 'No such utente']);
                }else{
                    callback([200, utente.orto]);
                }
            }
        });
    },

    /**
     * utenteController.isNellOrto()
     */
    isNellOrto: function (userData, callback) {
        utenteModel.count({telegramID: userData.id, ultimoAccesso: null}, function (err, numUtenti) {
            if (err) {
                callback([500, "Error when getting utente.", err]);
            } else {
                if (numUtenti == 0) {
                    callback([200, true]);
                }
                else {
                    callback([200, false]);
                }
            }
        });
    },


    /**
     * utenteTelegramController.addIngresso()
     */
    addIngresso: function (userData, callback) {
        //verifica che l'utente esista
        utenteModel.findOne({telegramID: userData.id},{ telegramID:0,
                                                        username:0,
                                                        password:0,
                                                        admin:0,
                                                        nome:0,
                                                        punti:0,
                                                        telegramID:0,
                                                        transazioni:0},
                                                        function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente.', err]);
            }
            else {
                if (!utente) {
                    callback([404, 'Utente inesistente', err]);
                }
                else {
                    //l'utente è nell'orto?
                    if (utente.isNellOrto()) {
                        callback([500, 'Errore, utente dentro l\'orto']);
                    }
                    else {
                        var tmp = utente.accessi.create({'ingresso': Date.now()});
                        utente.ultimoAccesso = tmp._id;
                        utente.accessi.push(tmp);
                        utente.save(function (err) {
                            if (err) {
                                callback([500, 'Errore nel salvataggio', err]);
                            }else{
                                callback([200, 'OK']);
                            }

                        });
                    }
                }
            }
        })
    },

    /**
     * utenteTelegramController.addUscita()
     */
    addUscita: function (userData, callback) {
        //verifica che l'utente esista
        utenteModel.findOne({telegramID: userData.id},{ username:0,
                                                        password:0,
                                                        admin:0,
                                                        nome:0,
                                                        punti:0,
                                                        telegramID:0,
                                                        transazioni:0},
                                                        function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente.', err]);
            }
            else {
                if (!utente) {
                    callback([404, 'Utente inesistente']);
                }
                else {
                    //l'utente è nell'orto?
                    if (!utente.isNellOrto()) {
                        callback([500, 'Errore, utente fuori dall\'orto']);
                    } else {
                        utente.accessi.id(utente.ultimoAccesso).uscita = Date.now();
                        //resetto l'ultimo accesso
                        utente.ultimoAccesso = null;
                        utente.save(function (err) {
                            if (err) {
                                callback([500, 'Errore, nell\'inserimento']);
                            } else {
                                callback([200, 'OK']);
                            }
                        });
                    }
                }
            }
        })},

    /**
     * utenteTelegramController.listAccessi()
     * lista ultimi 5 accessi
     */
    listAccessi: function (userData, callback) {
        utenteModel.findOne({telegramID: userData.id},{ _id:0,
                                                        username:0,
                                                        password:0,
                                                        admin:0,
                                                        punti:0,
                                                        ultimoAccesso:0,
                                                        transazioni:0,
                                                        orto:0,
                                                        accessi: {$slice: 5}},
                                                        function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
            } else {
                if (!utente) {
                    callback([404, 'No such utente']);
                }
                else {
                    callback([200, utente.accessi]);
                }
            }

        });
    },

    /**
     * utenteTelegramController.addTransazione()
     */
    addTransazione: function (userData, callback) {
        var dati;
        switch(userData.tipoTransazione){
            case 'vendo': dati = {'nome': userData.oggetto,'quantita': userData.quantita}; break;
            case 'acquisto' : dati = {'nome': userData.oggetto,'quantita': userData.quantita*(-1)}; break;
            default : callback([500, 'Tipo transazione non valido']); return;
        };
        utenteModel.findOne({telegramID: userData.user.id}, function (err, utente) {
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
     * utenteTelegramController.listTransazioni()
     * lista ultime 5 transazioni
     */
    listTransazioni: function (userData, callback) {
        utenteModel.findOne({telegramID: userData.id},{ _id:0,
                                                        username:0,
                                                        password:0,
                                                        admin:0,
                                                        punti:0,
                                                        ultimoAccesso:0,
                                                        accessi:0,
                                                        orto:0,
                                                        transazioni:{$slice: 5}},
                                                        function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
            }
            else {
                if (!utente) {
                    callback([404, 'No such utente']);
                }
                else {
                    callback([200, utente.transazioni]);
                }
            }
        });
    },

    /**
     * utenteTelegramController.addOrtaggio()
     */
    addOrtaggio: function (userData, callback) {
        if(userData.ortaggio!=null) {
            utenteModel.update(
                {telegramID: userData.id},
                {$addToSet: {orto: userData.ortaggio}}, function (err, data) {
                    if (err) {
                        callback([500, 'Error when updating utente.', err]);
                    } else {
                        callback([200, 'OK']);
                    }
                });
        } else {
            callback([500, 'Error, ortaggio is null']);
        }
    },

    /**
     * utenteTelegramController.removeOrtaggio()
     */
    removeOrtaggio: function (userData, callback) {
        utenteModel.update(
            {telegramID: userData.id},
            {$pull: {orto: userData.ortaggio}}, function(err, data){
                if(err){
                    callback([500, 'Error when updating utente.', err]);
                }
                else{
                    callback([200, 'Rimosso']);
                }
        });
    },

    /**
     * utenteController.completeSchedule()
     */
    completeSchedule: function (userData, callback) {
        utenteModel.findOne({telegramID: userData.utenteId}, function (err, utente) {
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
                schedule.scadenza = Date.now() + (schedule.attesa*24*60*60*1000);
                schedule.save(function(err){
                    if (err){
                        callback([500,'Error when updating schedule.']);
                    }else{
                        utente.azioni.push({nome: schdeule.nome, ricompensa: schdeule.ricompensa, dataCompletamento: Date.now()});
                        utente.punti += schedule.ricompensa;
                        utente.save(function (err) {
                            if (err){
                                //DB Sminchiato
                                callback([500,'Error when updating utente.']);
                            }else{
                                callback([200,schedule]);
                            }
                        });
                    }
                });
            });
        });
    }
};
