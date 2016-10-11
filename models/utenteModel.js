var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var utenteSchema = new Schema({
	'admin' : { type: Boolean, default: false  },
	'nome' : { type: String, required: true },
	'username' : {type: String, unique: true, required: true },
	'password' : { type: String, required: true },
	'telegramID' : { type: Number, index: true },
	'punti' : { type: Number, default: 0 },
	'ultimoAccesso' : { type: Schema.Types.ObjectId },
	'accessi' : [{
		'ingresso': { type: Date, required: true, default: Date.now() },
		'uscita': Date }],
	'transazioni' : [{
		'tipoTransazione': { type: String, enum: ['acquisto', 'vendo'] },
		'oggetto': { type: String, required: true },
		'quantita': { type: Number, required: true },
		'Data': { type: Date, default: Date.now()}
		}],
	'orto': [String],
	'azioni' : [{
		'nome' : { type: String, required: true },
		'ricompensa' : { type: Number, required: true },
		'dataCompletamento' : { type: Date, required: true },
	}]
});

utenteSchema.methods.verifyPassword = function(pwd){
	return pwd == this.password;
};

utenteSchema.methods.serializeUser = function(user, done){
	done(null, user._id);
};

utenteSchema.methods.deserializeUser = function(id, done){
	utenteSchema.findById(id, function(err, utenteSchema)
	{
		done(err, user);
	});
};
/**
 * verifica se l'utente è nell'orto
 * @returns {boolean}
 */
utenteSchema.methods.isNellOrto = function() {
	if(this.ultimoAccesso != null){
		return true;
	}else{
		return false;
	}

}
utenteSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('utente', utenteSchema);
