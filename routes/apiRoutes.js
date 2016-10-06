var express = require('express');

var api = {
    setApp: function(app){
        app.use("/rest-api/magazzino",require('./magazzini'));
        app.use("/rest-api/schedule",require('./schedule'));
        app.use("/rest-api/controlunit",require('./centraline'));
        app.use("/rest-api/utente",require('./utenti'));
        app.use("/rest-api/utenteTelegram",require('./utentiTelegram'));
    }
};

module.exports = api;