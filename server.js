const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const assert = require('assert');
const mongourl = 'mongodb://localhost:27017/bookingSystem';
const helmet = require('helmet');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('express-jwt');

var configDB = require('./config/database');
var User = require('./models/user');
var sendReset = require('./backend/sendReset');
var bookingHandler = require('./backend/bookingHandler');

const PORT = 3000;
var isAdmin = false;

app.use(express.static('public'));
app.use(helmet())
app.use(bodyParser());
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!
app.use(passport.initialize());

app.use(helmet.frameguard({ action: 'sameorigin' }));

app.use(jwt({ secret: 'secret'}).unless({path: ['/login', '/signup','/requestReset', '/checkResetToken', '/resetPassword']}));

mongoose.connect(configDB.url, {
  useMongoClient: true,
});
require('./config/passport')(passport);

// Creates the admin account if not already created
User.findOne({'local.username': 'admin'}, (err, user) => {
  if (!user) {
    var adminUser = new User()
    adminUser.local.username = 'admin';
    adminUser.local.password = adminUser.generateHash('password');
    adminUser.local.admin = true;
    adminUser.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
});

app.post('/login', (request, response, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return response.send(err);
    }
    if (!user) {
      return response.send(info);
    }
    return response.send({
	    success: true, 
	    token: user.token, 
	    admin: user.local.admin, 
	    email: user.local.email
    });
  })(request, response, next);
});

app.post('/signup', (request, response, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    console.log(err);
    console.log(user);
    console.log(info);
    if (err) {
      return response.send(err);
    }
    if (!user) {
      return response.send(info);
    }
    return response.send({success: true, message: 'signup success'});
  })(request, response, next);
});

app.get('/bookings', (request, response) => {
	console.log(request.params.email);
  	bookingHandler.getBookings(request.params.email, (data) => {
		response.send(data);
	});
});

app.post('/book', (request, response) => {
	bookingHandler.makeBooking(request.body, (data) => {
		response.send(data);
	});
});

app.put('/cancelBooking', (request, response) => {
	bookingHandler.cancelBooking(request.body.email, request.body.id, (data) => {
		response.send(data);
	})
});

app.post('/delete_booking', (request, response) => {
	let bookingId = request.body.bookingId;

  	mongoClient.connect(mongourl, (err, db) => {
    	assert.equal(null, err);

		db.collection('bookings').deleteOne({
			_id: new mongodb.ObjectID(bookingId)
		}, (err, result) => {
			response.send('deleted');
			db.close();
		});
  	});
});

app.put('/approve_booking', (request, response) => {
	let bookingId = request.body.bookingId;
	mongoClient.connect(mongourl, (err, db) => {
    	assert.equal(null, err);

		db.collection('bookings').update({
			_id: new mongodb.ObjectID(bookingId)
		}, {
			$set: {approved: 'true'}
		}, (err, result) => {
			response.send('approved');
			db.close();
		});
  	});
});

app.put('/unapprove_booking', (request, response) => {
	let bookingId = request.body.bookingId;
	mongoClient.connect(mongourl, (err, db) => {
    	assert.equal(null, err);

		db.collection('bookings').update({
			_id: new mongodb.ObjectID(bookingId)
		}, {
			$set: {approved: 'false'}
		}, (err, result) => {
			response.send('approved');
			db.close();
		});
  	});
});

app.post('/requestReset', (request, response) => {
	sendReset.resetEmail(request.body.username, (data) => {
		response.send(data);
	});
});

app.post('/checkResetToken', (request, response) => {
	sendReset.checkToken(request.body.token, (data) => {
		response.send(data);
	});
});

app.post('/resetPassword', (request, response) => {
	sendReset.resetPassword(request.body.token, request.body.password, (data) => {
		response.send(data);
	});
});


app.listen(PORT, () => {
  console.log(`Running Express on port ${PORT}...`);
});
