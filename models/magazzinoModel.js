var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var magazzinoSchema = new Schema({
	'nome' : { type: String, unique: true, required: true },
	'quantita' : { type: Number, default:0 },
	'costo' : { type: Number, required: true},
	'immagine' : {type: String}
});

module.exports = mongoose.model('magazzino', magazzinoSchema);
