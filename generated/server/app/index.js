var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var chalk = require('chalk');
var bodyParser = require('body-parser');

var publicPath = path.join(__dirname, '../../public');
var indexHtmlPath = path.join(__dirname, '../index.html');
var nodePath = path.join(__dirname, '../../node_modules');
/* 
Meaniscule doesn't use Bower by default. To use Bower,
uncomment the following line and the related `app.use` line below.
*/
// var bowerPath = path.join(__dirname, '../../bower_components');

var startApp = function() {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(publicPath));
  app.use(express.static(nodePath));
  // app.use(express.static(bowerPath));

  /* 
  Provides a 404 for times when 
  Credit to `fsg` module for this one!
  */
  app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
      res.status(404).end();
    } else {
      next(null);
    }

  });

  // Routes
  //// APIs for AJAX
  app.use('/api', require('../routes/'));

  //// Index/Home
  app.use('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, './views/index.html'));
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
    console.log('The server is listening on port', chalk.green.bold(port), 'and loves you very much.');
  });
  
};

module.exports = {
  startApp: startApp,
  startServer: startServer
};
