var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var scheduleSchema = new Schema({	'nome' : String,	'ultimoReset' : Date,	'scadenza' : Number});

module.exports = mongoose.model('schedule', scheduleSchema);
