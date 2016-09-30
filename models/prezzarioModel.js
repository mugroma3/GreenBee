var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var prezzarioSchema = new Schema({
	'prodotto' : { type: String, unique: true, required: true },
	'costo' : { type: Number, required: true}
});

module.exports = mongoose.model('prezzario', prezzarioSchema);
