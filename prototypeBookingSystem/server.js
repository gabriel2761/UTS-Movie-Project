const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const mongourl = 'mongodb://localhost:27017/bookingSystem';
const username = 'user';
const password = 'password';
const PORT = 3000;

app.use(express.static('public'));
app.use(express.bodyParser());
app.use(expressValidator()); // Must be after bodyParser

// Rest endpoint to receive login post requests
app.post('/login', (request, response) => {
    if (username === request.body.username && password === request.body.password) {
	response.send(true);
    } else {
	response.send(false);
    }
});

// Rest endpoint to fetch all bookings from database
app.get('/bookings', (request, response) => {
    MongoClient.connect(mongourl, function(err, db) {
	assert.equal(null, err);
	db.collection('bookings').find().toArray(function(err, docs) {
	    assert.equal(null, err);
	    console.log(docs);
	    response.send(docs);
	});
	db.close();
    });
});

// Rest endpoint to insert bookings into database
app.post('/book', (request, response) => {
    MongoClient.connect(mongourl, function(err, db) {
	assert.equal(null, err);
	db.collection('bookings').insertOne(request.body,function(err, r) {
	assert.equal(null, err);
	assert.equal(1, r.insertedCount);
	});
	db.close();
    });
    response.send({this: 'happends'});
});

// Start express server on predefined port
app.listen(PORT, () => {
    console.log(`Running Express on port ${PORT}...`);
});
