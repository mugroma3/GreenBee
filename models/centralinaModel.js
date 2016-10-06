var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var sensoreModel = require('./sensoreModel');

var centralinaSchema = new Schema({
	'name': {type: String, required: true },
	'battery_lvl': Number,
	'luminosity': Number,
	'Data' : Date,
	'ble_servers': [{
		type: Schema.Types.ObjectId,
		ref: 'sensore'
	}]
});

module.exports = mongoose.model('centralina', centralinaSchema);
