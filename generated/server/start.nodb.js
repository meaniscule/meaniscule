'use strict';

const chalk = require('chalk');
const port = (process.env.PORT || 4545);

let requireApp = new Promise(function(resolve, reject) {
	let app = require('./app');
	resolve(app);
});

// Start the server
requireApp
	.then(function(app) {
		app.listen(port, function() {
			console.log('The server is listening on port', chalk.green.bold(port), 'and loves you very much.');
			console.log('Make sure you are running ' + chalk.white.bgBlack(' npm run watch ') + ' in another tab!');
		}); 
	})
	.catch(function(err) {
		console.log('Problem starting up!', chalk.red(err.message));
		console.log('I\'m out!');
		process.kill(1);
	});