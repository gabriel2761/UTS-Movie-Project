const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const mongourl = 'mongodb://localhost:27017/bookingSystem';

app.use(express.static('public'));
app.use(express.bodyParser());
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!

//const bookings = [];

const username = 'user';
const password = 'password';

app.post('/login', (request, response) => {
  if (username === request.body.username && password === request.body.password) {
	response.send(true);
  } else {
	response.send(false);
  }
});

app.get('/bookings', (request, response) => {
  //response.send(bookings);

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

app.post('/book', (request, response) => {
  //bookings.push(request.body);

  MongoClient.connect(mongourl, function(err, db) {
    assert.equal(null, err);
    db.collection('bookings').insertOne(request.body,function(err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);
    });
    db.close();
  });

  response.send({
    this: 'happends'
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Running Express on port ${port}...`);
});
