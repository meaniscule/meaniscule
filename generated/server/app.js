'use strict';

const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static paths
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/build'))); // for gulped files
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, './images')));
// app.use(express.static(path.join(__dirname, '../bower_components')));

/* 
Provides a 404 when attemping to access a file 
that wasn't found in one of the static paths above.
Credit to `fsg` module for this one!
*/
app.use(function fileNotFound(req, res, next) {

	if (path.extname(req.path).length > 0) {
		res.sendStatus(404);
	} else {
		next(null);
	}

});

/* API routes
	Require each route dynamically 
	Look up all route files/folders from directory
*/
let directories = fs.readdirSync(path.join(__dirname, '/api/'));

directories.forEach(function(dir) {
	// Prepend /api/ to all api routes
	app.use('/api/' + dir + '/', require('./api/' + dir));
});

// Index/Home
app.use('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, './index.html'));
});


// Errors
//// Not found
app.use(function apiNotFound(err, req, res, next) {
	res.sendStatus(404);
});

//// Server issues
app.use(function(err, req, res, next) {
	res.sendStatus(err.status || 500);    
});


module.exports = app;