const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

app.use(express.static('public'));
app.use(express.bodyParser());
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!

var title = 'Gone with the wind';
var date = '2015-08-10';
var duration = '85 minutes';
var genre = 'romance';
var synopsis = 'Guy marries girl and slaves everywhere';

app.get('/init', (request, response) => {
	response.send({
		title: title,
		date: date,
		duration: duration,
		genre: genre,
		synopsis: synopsis
	});
});

app.post('/movie', (request, response) => {
	title = request.body.title;
	date = request.body.date;
	duration = request.body.duration;
	genre = request.body.genre;
	synopsis = request.body.synopsis;

	request.checkBody('title').notEmpty();
	request.sanitizeBody('title').toBoolean();

	request.getValidationResult().then(function(result) {
		if (!result.isEmpty()) {
			response.status(400).send('There have been validation errors: ' + util.inspect(result.array()));

			return;
		}

		response.send({
			title: title,
			date: date,
			duration: duration,
			genre: genre,
			synopsis: synopsis
		});

		// request.json({
			// urlparam: req.params.urlparam,
			// getparam: req.query.getparam,
			// postparam: req.body.postparam
		// });
	});

});

app.listen(7000, () => {
	console.log('Running Express...');
});
