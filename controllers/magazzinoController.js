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
    list: function (userData, callback) {
        magazzinoModel.find(function (err, magazzinos) {
            if (err) {
                callback([500, "Error when getting magazzini.", err]);
            }
            callback([200, magazzinos]);
        });
    },

    /**
     * magazzinoController.show()
     */
    show: function (userData, callback) {
        magazzinoModel.findOne({_id: userData.id}, function (err, magazzino) {
            if (err) {
                callback([500, "Error when getting magazzino.", err]);
            }
            if (!magazzino) {
                callback([404, 'No such magazzino']);
            }
            callback([200, magazzino]);
        });
    },

    findByName: function (userData, callback) {
        magazzinoModel.findOne({nome: userData.nome}, function (err, magazzino) {
            if (err) {
                callback([500, "Error when getting magazzino.", err]);
            }
            if (!magazzino) {
                callback([404, 'No such magazzino']);
            }
            callback([200, magazzino]);
        });
    },

    /**
     * magazzinoController.create()
     */
    create: function (userData, callback) {
        var magazzino = new magazzinoModel(userData);

        magazzino.save(function (err, magazzino) {
            if (err) {
                callback([500, "Error when creating magazzino.", err]);
            }
            callback([201, magazzino]);
        });
    },

    /**
     * magazzinoController.update()
     */
    update: function (userData, callback) {
        magazzinoModel.findOne({_id: userData.id}, function (err, magazzino) {
            if (err) {
                callback([500, "Error when getting magazzino.", err]);
            }
            if (!magazzino) {
                callback([404, 'No such magazzino']);
            }

            magazzino.nome = userData.nome ? userData.nome : magazzino.nome;
			magazzino.quantita = userData.quantita ? userData.quantita : magazzino.quantita;
			
            magazzino.save(function (err, magazzino) {
                if (err) {
                    callback([500, "Error when updating magazzino.", err]);
                }

                callback([200, magazzino]);
            });
        });
    },

    updateQuantita: function (userData, callback) {
        /* userData.nome indica il nome
        * userData.quantita è un numero indicante la variazione della quantità. sarà >0 per le vendite, <0 per gli acquisti
        * */
        magazzinoModel.findOne({nome: userData.nome}, function (err, magazzino) {
            if (err) {
                callback([500, "Error when getting magazzino.", err]);
            }
            if (!magazzino && userData.quantita>0) {
                //Se non esiste lo creo
                this.create(userData, callback);
            } else {
                callback([500, "Errore, mi stai tentando di trollare?"]);
            }

            if(magazzino.quantita+userData.quantita>=0){
                magazzino.quantita = magazzino.quantita+userData.quantita;
                magazzino.save(function (err, magazzino) {
                    if (err) {
                        callback([500, "Error when updating magazzino.", err]);
                    }

                    callback([200, magazzino]);
                });
            } else {
                callback([500, "Errore, non vi sono abbastanza oggetti in magazzino"]);
            }



        });
    }
};
