var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var prezzarioSchema = new Schema({	'prodotto' : String,	'costo' : Number});

module.exports = mongoose.model('prezzario', prezzarioSchema);
