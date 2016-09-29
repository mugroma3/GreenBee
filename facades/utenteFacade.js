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
                return [500, "Error when creating utente"];
            }
            return [201, utente];
        });
    }

}