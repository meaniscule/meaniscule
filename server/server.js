var path = require('path');
var logger = require('morgan');
var express = require('express');
var app = express();

var routes = require('./routes');
var publicPath = path.join(__dirname, '../public');
var bowerPath = path.join(__dirname, '../bower_components');
var indexHtmlPath = path.join(__dirname, '../index.html');

app.use(logger('dev'));

app.use(express.static(publicPath));
app.use(express.static(bowerPath));

app.use('/', routes);

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.sendStatus(err.status || 500);

});

var port = 4545;
app.listen(port, function() {
	console.log('The server is listening and loves you very much.');
});