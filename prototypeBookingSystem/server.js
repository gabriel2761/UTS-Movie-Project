const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

app.use(express.static('public'));
app.use(express.bodyParser());
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!

const bookings = [];

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
	response.send(bookings);
});

app.post('/book', (request, response) => {
	bookings.push(request.body);

	response.send({
	  this: 'happends'
	});
});

const port = 7000;

app.listen(port, () => {
	console.log(`Running Express on port ${port}...`);
});
