const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongourl = 'mongodb://localhost:27017/bookingSystem';
const app = express();

const PORT = 3000;
var isAdmin = false;

app.use(express.static('public'));
app.use(express.bodyParser());
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!


// Creates the admin account if not already created
MongoClient.connect(mongourl, (err, db) => {
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

	MongoClient.connect(mongourl, (err, db) => {
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
	MongoClient.connect(mongourl,(err, db) => {
    	assert.equal(null, err);
    	db.collection('bookings').find().toArray((err, docs) => {
    		assert.equal(null, err);
    		response.send(docs);
    	});

    	db.close();
  	});
});

app.post('/book', (request, response) => {
  	MongoClient.connect(mongourl, (err, db) => {
    	assert.equal(null, err);
    	db.collection('bookings').insertOne(request.body, (err, r) => {
      		assert.equal(null, err);
      		assert.equal(1, r.insertedCount);
			response.send('success');
    	});

    	db.close();
  	});
});


app.listen(PORT, () => {
  console.log(`Running Express on port ${PORT}...`);
});
