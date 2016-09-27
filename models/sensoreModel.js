var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var sensoreSchema = new Schema({	'nome' : String,	'idBluetooth' : String,	'data' : Date,	'umidita' : Number,	'batteria' : Number});

module.exports = mongoose.model('sensore', sensoreSchema);
