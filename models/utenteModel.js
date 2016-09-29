var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var utenteSchema = new Schema({
	'admin' : { type: Boolean, default: false  },
	'nome' : { type: String, required: true },
	'username' : {type: String, unique: true, required: true },
	'password' : { type: String, required: true },
	'punti' : { type: Number, default: 0 },
	'accessi' : [{
		'ingresso': { type: Date, required: true, default: Date.now() },
		'uscita': Date }],
	'transazioni' : [{
		'tipoTransazione': { type: String, enum: ['acquisto', 'vendo'] },//TODO verificare inserire default: vendo/acquisto
		'oggetto': { type: String, required: true },
		'quantita': { type: Number, required: true },
		'Data': { type: Date, default: Date.now(),
		'Orto': [String]
		}}]
});

module.exports = mongoose.model('utente', utenteSchema);
