var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var chalk = require('chalk');

var publicPath = path.join(__dirname, '../public');
var bowerPath = path.join(__dirname, '../bower_components');
var indexHtmlPath = path.join(__dirname, '../index.html');

var startApp = function() {
  app.use(logger('dev'));

  app.use(express.static(publicPath));
  app.use(express.static(bowerPath));


  // Routes
  //// APIs for AJAX
  app.use('/api', require('../routes/'));

  //// Index/Home
  app.use('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, './app/views/index.html'));
  });


  // Errors
  //// Not found
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  //// Server issues
  app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);

  });
};

var startServer = function() {
  var port = 4545;

  app.listen(port, function() {
    console.log('The server is listening on port', chalk.white(port), 'and loves you very much.');
  });
  
};

module.exports = {
  startApp: startApp,
  startServer: startServer
};
