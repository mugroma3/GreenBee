var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var magazzinoSchema = new Schema({	'nome' : String,	'quantita' : Number});

module.exports = mongoose.model('magazzino', magazzinoSchema);
