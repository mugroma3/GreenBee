var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var utenteSchema = new Schema({
	'admin' : { type: Boolean, default: false  },
	'nome' : { type: String, required: true },
	'username' : {type: String, unique: true, required: true },
	'password' : { type: String, required: true },
	'punti' : { type: Number, default: 0 },
	'accessi' : [{
		'ingresso': { type: Date, required: true, default: Date.now() },
		'uscita': Date }],
	'transazioni' : [{
		'tipoTransazione': { type: String, enum: ['acquisto', 'vendo'] },
		'oggetto': { type: String, required: true },
		'quantita': { type: Number, required: true },
		'Data': { type: Date, default: Date.now(),
		'Orto': [String]
		}}]
});

utenteSchema.methods.verifyPassword = function(pwd){
	return pwd == this.password;
};

utenteSchema.methods.serializeUser = function(user, done){
	done(null, user._id);
};

utenteSchema.method.sunserializeUser = function(id, done){
	utenteSchema.findById(id, function(err, utenteSchema)
	{
		done(err, user);
	});
};

utenteSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('utente', utenteSchema);
