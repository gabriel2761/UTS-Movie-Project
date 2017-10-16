const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var configDB = require('../config/database.js');
var emailConfig = require('../config/email.js');
var User = require('../models/user');

mongoose.connect(configDB.url, {
  useMongoClient: true,
});

function resetEmail(email, callback) {
  User.findOne({'local.username': email}, (err, user) => {
    if (!user) {
      callback('No account with that email exists.');
    } else {
      crypto.randomBytes(20, (err, buf) => {
        var token = buf.toString('hex');
	user.local.resetPasswordToken = token;
	user.local.resetPasswordExpires = Date.now() + 3600000;
	user.save((err) => {
	  var smtpTransport = nodemailer.createTransport({
	    service: 'Gmail',
            auth: {
	      user: emailConfig.email,
	      pass: emailConfig.password,
	    }
	  });
	  console.log(user.local.username);
	  var mailOptions = {
	    to: user.local.username,
	    from: 'passwordreset@patientbooking.noreply',
	    subject: 'Patient Booking System Password Reset',
	    text: 'Here is your password reset link as request. Please click it or paste it into ' +
		  'your browser to complete the reset. \n\n' +
		  'http://' + emailConfig.host + '/#/resetPassword/' + token + '\n\n' +
		  'Please ignore this if you did not request to reset your password.'
	  };
	  smtpTransport.sendMail(mailOptions, function(err) {
	    if (err) {
	      console.log(err);
	      callback('An error occured, please try again.');
	    } else {
	      callback('Password reset email sent!');
	    }
	  });
	});
      });
    }
  })
}

function checkToken(token, callback) {
  User.findOne({'local.resetPasswordToken': token}, (err, user) => {
    if (!user) {
      callback(false);
    } else {
      if (user.local.resetPasswordExpires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    }
  });
}

function resetPassword(token, password, callback) {
  User.findOne({'local.resetPasswordToken': token}, (err, user) => {
    console.log(user);
    console.log(password);
    if (!user) {
      callback('An error occured');
    } else {
      user.local.password = user.generateHash(password);
      user.save((err) => {
        if (err) {
	  callback('An error occured');
	} else {
	  callback('Password changed!');
	}
      });
    }
  });
}

module.exports = {
  resetEmail: resetEmail,
  checkToken: checkToken,
  resetPassword: resetPassword,
}
