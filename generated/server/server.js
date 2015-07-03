var chalk = require('chalk');

// Returns a promise from ./db/index.js
var startDb = require('./db');
var app = require('./app');


// Start the server
startDb
  .then(app.initializeRoutes)
  .then(app.startServer)
  .catch(function(err) {
    console.log('Problem starting up!', chalk.red(err.message));
    console.log('I\'m out!');
    process.kill(1);
  });