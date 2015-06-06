var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var mongoose = require('mongoose');
var startDb = require('./server/db');
var Nodemodule = mongoose.model('Nodemodule');
var chalk = require('chalk');

var moduleNamesArray;

startDb.then(function() {
  // Get all module names
  fs.readdirAsync(__dirname + '/node_modules/')
    // Get package.json content for all modules
    .then(function(moduleNames) {
      moduleNamesArray = moduleNames.filter(function(e) {
        return e !== ".bin";
      });
      
      return Promise.all(moduleNamesArray.map(function(module){
        return fs.readFileAsync(path.join(__dirname, '/node_modules/' + module + '/package.json'), {'encoding': 'utf8'});
      }));
    })
    // Parse json
    .then(function(files) {
      return Promise.all(files.map(function(file){
        return JSON.parse(file);
      }));
    })
    // Get repository urls
    .then(function(parsed) {
      return Promise.all(parsed.map(function(obj) {
        return obj.repository.url;
      }));
    })
    // Create model-compatible objects
    .then(function(repos) {
      return Promise.all(moduleNamesArray.map(function(e, i) {
        return {
          title: e,
          repoUrl: repos[i]
        };
      }));
    })
    // Write to the db and exit
    .then(function(moduleObjects) {
      moduleObjects.forEach(function(e) {
        Nodemodule.create(e)
          .then(function(){
            console.log(chalk.green('Database seeded. Goodbye!'));
            process.exit(1);
          });
      });
    });
});