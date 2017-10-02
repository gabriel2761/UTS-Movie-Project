const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallBack: true,
  }, 
  function(username, password, done){
    process.nextTick(function() {
      User.findOne({ 'local.username': username }, function(err, user) {
        if (err) {
          return done(err);
        }
	if (user) {
	  return done(null, false, {'success': false, 'message':'That email is already taken.'});
	} else {
	  console.log("username: " + username);
	  console.log("password: " + password);
	  console.log("done: " + done);
	  var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
	  newUser.local.admin = false;

          newUser.save(function(err) {
	    if (err) {
	      throw err;
	    }
            return done(null, newUser);
	  });
	}
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallBack: true,
  },
  function(username, password, done) {
    User.findOne({'local.username': username }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {'success': false, 'message': 'No user found'});
      }

      if (!user.validPassword(password)) {
        return done(null, false, {'success': false, 'message': 'Incorrect password'});
      }

	  let userDetails = {
		id: user._id,
		username: user.local.username,
		admin: user.local.admin,
	  }

	  let token = jsonwebtoken.sign(userDetails, 'secret', {
		expiresIn: 2592000 // 1 month
	  });

	  user.token = token;

      return done(null, user);
    });
  }));
}
