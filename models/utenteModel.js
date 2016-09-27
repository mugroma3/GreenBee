var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var utenteSchema = new Schema({	'admin' : Boolean,	'nome' : String,	'punti' : Number,	'accessi' : Array,	'transazioni' : Array});

module.exports = mongoose.model('utente', utenteSchema);
