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
    list: function (userData, callback) {
        utenteModel.find(function (err, utentes) {
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
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, "Error when getting utente.", err]);
            }
            if (!utente) {
                callback([404, 'No such utente']);
            }
            callback([200, utente]);
        });
    },

    /**
     * utenteController.isNellOrto()
     */
    isNellOrto: function (userData, callback) {
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, "Error when getting utente.", err]);
            }
            if (!utente) {
                callback([404, 'No such utente']);
            }
            callback([200, utente.isNellOrto()]);
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
     * utenteController.listIngressi()
     */
    listIngressi: function (userData, callback) {
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
        utenteModel.findOne({_id: userData.user.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente', err]);
            }
            if (!utente) {
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
                        callback([500, 'Error when updating utente', err]);
                    }
                    callback([200, utente]);
                });
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
        //verifica che l'utente esista
        utenteModel.findOne({_id: userData.id}, function (err, utente) {
            if (err) {
                callback([500, 'Error when getting utente.', err]);
            }
            if (!utente) {
                callback([404, 'Utente inesistente', err]);
            }
            else{
                utente.orto.push(userData.ortaggio);
                //utenteModel.update({ _id: userData.id }, {$addToSet: { 'orto': userData.ortaggio} }); //TODO aggiustare sta merda
                //console.log(utente.orto);
                utente.save(function (err, utente) {
                    if (err) {
                        callback([500, 'Error when updating utente', err]);
                    }
                    callback([200, utente]);
                });
            }
        });

    }
};
