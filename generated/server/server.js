// Start the server
// Returns a promise from ./db/index.js
var startDb = require('./db');
var app = require('./app');
var chalk = require('chalk');

startDb
  .then(app.startApp)
  .then(app.startServer)
  .catch(function(err) {
    console.log('Problem starting up!', chalk.red(err.message));
    console.log('I\'m out!');
    process.kill(1);
  });