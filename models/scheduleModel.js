var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var scheduleSchema = new Schema({
	'nome' : { type: String, unique: true, required: true },
	'ricompensa' : { type: Number, required: true },
	'scadenza' : { type: Date, required: true },
	'attesa' : { type: Number, required: true }
});

module.exports = mongoose.model('schedule', scheduleSchema);
