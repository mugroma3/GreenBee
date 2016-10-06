var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var sensoreSchema = require('./sensoreModel').schema;

var centralinaSchema = new Schema({
	'name': {type: String, required: true },
	'battery_lvl': Number,
	'luminosity': Number,
	'Data' : { type: Date, default: Date.now() },
	'ble_servers': [sensoreSchema]
});

module.exports = mongoose.model('centralina', centralinaSchema);
