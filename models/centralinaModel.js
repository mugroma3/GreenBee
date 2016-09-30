var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var centralinaSchema = new Schema({	'ph' : Number,	'irraggiamentoSolare' : Number,	'batteria' : Number,	'temperatura' : Number,	'data' : Date});

module.exports = mongoose.model('centralina', centralinaSchema);
