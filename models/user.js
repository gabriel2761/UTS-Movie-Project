var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String,
    admin: Boolean,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

userSchema.methods.generateHash = function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

