var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var magazzinoSchema = new Schema({
	'nome' : { type: String, unique: true, required: true },
	'quantita' : { type: Number, required: true }
});

module.exports = mongoose.model('magazzino', magazzinoSchema);
