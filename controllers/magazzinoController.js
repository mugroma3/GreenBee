var magazzinoModel = require('../models/magazzinoModel.js');
var uuid = require('uuid');

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
        magazzinoModel.find({quantita: {$gt: 0}},function (err, magazzinos) {
            if (err) {
                callback([500, "Error when getting magazzini.", err]);
            } else {
                callback([200, magazzinos]);
            }
        });
    },

    listAll: function (userData, callback) {
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

        if (!userData.immagine) {
            callback(500, 'No files were uploaded.');
            return;
        }
        var nomeOriginale = userData.immagine.name.split('.');

        var uuidName = uuid.v4();
        var pathImmagineLocal = "./public/imgOggetti/"+uuidName+"."+nomeOriginale[nomeOriginale.length-1];
        var pathImmagineStatic = "/imgOggetti/"+uuidName+"."+nomeOriginale[nomeOriginale.length-1];


        userData.immagine.mv(pathImmagineLocal, function(err) {
            if (err) {
                callback(500, 'Errore nel salvataggio immagine', err);
            } else {
                var magazzino = new magazzinoModel({nome: userData.nome, costo: userData.costo, immagine: pathImmagineStatic});

                magazzino.save(function (err, magazzino) {
                    if (err) {
                        console.log(err);
                        callback([500, "Error when creating magazzino.", err]);
                    } else {
                        callback([201, magazzino]);
                    }
                });
            }
        });


    },

    /**
     * magazzinoController.remove()
     */
    remove: function (userData, callback) {
        magazzinoModel.findByIdAndRemove(userData.id, function (err, magazzino) {
            if (err) {
                callback([500, 'Error when deleting the oggetto in magazzino.', err]);
            }
            else {
                callback([204, "oggetto rimosso dal magazzino"]);
            }
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
            magazzino.costo = userData.costo ? userData.costo : magazzino.costo;
            magazzino.immagine = userData.immagine ? userData.immagine : magazzino.immagine;
			
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
            if (!magazzino){
                callback([500, "Errore: la roba che vendi non è accettata sul mercato"]);
            } else {
                if (magazzino.quantita + userData.quantita >= 0) {
                    magazzino.quantita += (userData.quantita - 0);
                    magazzino.save(function (err, magazzino) {
                        if (err) {
                            callback([500, "Error when updating magazzino.", err]);
                        }else{
                            callback([200, magazzino]);
                        }
                    });
                } else {
                    callback([500, "Errore, non vi sono abbastanza oggetti in magazzino"]);
                }
            }
        });
    }
};
