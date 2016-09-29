var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var utenteSchema = new Schema({
	'admin' : { type: Boolean, default: false  },
	'nome' : { type: String, required: true },
	'username' : {type: String, unique: true, required: true },
	'password' : { type: String, required: true },
	'telegramID' : { type: Number, index: true },
	'punti' : { type: Number, default: 0 },
	'accessi' : [{
		'ingresso': { type: Date, required: true, default: Date.now() },
		'uscita': Date }],
	'transazioni' : [{
		'tipoTransazione': { type: String, enum: ['acquisto', 'vendo'] },
		'oggetto': { type: String, required: true },
		'quantita': { type: Number, required: true },
		'Data': { type: Date, default: Date.now(),
		'Orto': [String]
		}}]
});

utenteSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('utente', utenteSchema);
