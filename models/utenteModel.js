var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var utenteSchema = new Schema({
	'admin' : { type: Boolean, default: false },
	'nome' : { type: String, unique: true },
	'punti' : { type: Number, default: 0 },
	'accessi' : Array,
	'transazioni' : Array
});

module.exports = mongoose.model('utente', utenteSchema);
