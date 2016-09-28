var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var scheduleSchema = new Schema({
	'nome' : { type: String, unique: true, required: true },
	'ultimoReset' : { type: Date, required: true },
	'scadenza' : { type: Number, required: true }
});

module.exports = mongoose.model('schedule', scheduleSchema);
