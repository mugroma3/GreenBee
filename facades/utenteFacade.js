var utenteModel = require('../models/utenteModel.js');

module.exports = {

    create: function (nome, username, password, admin) {
        var utente = new utenteModel({
            admin: admin,
            nome: nome,
            username:  username,
            password: password

        });

        utente.save(function (err, utente) {
            if (err) {
                console.log("errore 500");
                return [500, "Error when creating utente", err];
            }
            console.log("e andato tutto bene");
            return [201, utente];
        });
    },

    update: function (id, nome, punti, admin) {
        utenteModel.findOne({_id: id}, function (err, utente) {
            if (err) {
                return [500, 'Error when getting utente', err];
            }
            if (!utente) {
                return [404, 'No such utente'];
            }

            utente.admin = admin ? admin : utente.admin;
            utente.nome = nome ? nome : utente.nome;
            utente.punti = punti ? punti : utente.punti;
            utente.accessi = accessi ? accessi : utente.accessi;
            utente.transazioni = transazioni ? transazioni : utente.transazioni;

            utente.save(function (err, utente) {
                if (err) {
                    return [500, 'Error when updating utente.', err];
                }

                return [200, utente];
            });
        });

    }

}