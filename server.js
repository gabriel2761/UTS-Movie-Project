const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const assert = require('assert');
const mongourl = 'mongodb://localhost:27017/bookingSystem';
const app = express();

const PORT = 3000;
var isAdmin = false;

app.use(express.static('public'));
app.use(express.bodyParser());
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!


// Creates the admin account if not already created
mongoClient.connect(mongourl, (err, db) => {
	assert.equal(null, err);

	db.collection('users').insertOne(
		{ username: 'admin', password: 'password', admin: true },
		{ upsert: true }
	);

	db.close();
});

app.post('/login', (request, response) => {
	let username = request.body.username;
	let password = request.body.password;

	mongoClient.connect(mongourl, (err, db) => {
		assert.equal(null, err);

		db.collection('users').findOne({
			username: username,
			password: password
		}, (err, result) => {
			if (!result) {
				response.send(false);
				db.close();
				return;
			}

			if (result.admin) {
				isAdmin = true;
			}

			response.send(true);
			db.close();
		});
	});
});

app.get('/bookings', (request, response) => {
	mongoClient.connect(mongourl,(err, db) => {
    	assert.equal(null, err);
    	db.collection('bookings').find().toArray((err, bookings) => {
    		assert.equal(null, err);
    		response.send(bookings);
    	});

    	db.close();
  	});
});

app.post('/book', (request, response) => {
  	mongoClient.connect(mongourl, (err, db) => {
    	assert.equal(null, err);
    	db.collection('bookings').insertOne(request.body, (err, r) => {
      		assert.equal(null, err);
      		assert.equal(1, r.insertedCount);
			response.send('success');
    	});

    	db.close();
  	});
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

app.listen(PORT, () => {
  console.log(`Running Express on port ${PORT}...`);
});
