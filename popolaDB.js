/**
 * Created by kappa on 30/09/16.
 */
/*
popola db con 1 admin e 2 utenti
 */

var utenteController = require('../controllers/utenteController');

var options = {
    nome: req.body.nome,
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin

utenteController.create();


