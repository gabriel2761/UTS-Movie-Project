var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(7000, () => {
	console.log('Running Express...');
});

