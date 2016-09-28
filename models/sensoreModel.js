var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var sensoreSchema = new Schema({
	'nome' : {type: String, unique: true, required: true },
	'idBluetooth' : {type: String, unique: true, required: true },
	'data' : Date,
	'umidita' : Number,
	'batteria' : Number
});

module.exports = mongoose.model('sensore', sensoreSchema);
