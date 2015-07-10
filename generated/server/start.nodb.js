// Transpile ES6 to ES5
require('babel/register');

var chalk = require('chalk');

var port = (process.env.PORT || 4545);
// Start the server
var app = require('./app');
    
app.listen(port, function() {
  console.log('The server is listening on port', chalk.green.bold(port), 'and loves you very much.');
})
.catch(function(err) {
  console.log('Problem starting up!', chalk.red(err.message));
  console.log('I\'m out!');
  process.kill(1);
});