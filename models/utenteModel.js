var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var utenteSchema = new Schema({
	'admin' : { type: Boolean, default: false },
	'nome' : { type: String, unique: true },
	'punti' : { type: Number, default: 0 },
	'accessi' : [{
		'ingresso': Date,
		'uscita': Date }],
	'transazioni' : [{
		'tipoTransazione': String, //TODO inserire default: vendo/acquisto
		'oggetto': String,
		'quantita': Number,
		'Data': { type: Date, default: Date.now()
		}}]
});

module.exports = mongoose.model('utente', utenteSchema);
