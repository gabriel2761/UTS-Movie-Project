const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.bodyParser());

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

	console.log(request.body);

	response.send({
		title: title,
		date: date,
		duration: duration,
		genre: genre,
		synopsis: synopsis
	});
});

app.listen(7000, () => {
	console.log('Running Express...');
});
