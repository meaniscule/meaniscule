/* 
This file is just an example of how you might seed your database. 

In this example, the names and URLs of the contents of `/node_modules`
are stored in the database.
*/

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var mongoose = require('mongoose');
var startDb = require('./server/db');
var Nodemodule = require('./server/api/modules/nodemodule.model.js');
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

        // Make url protocols consistent
        var url = urlCleaner(repos[i]);

        return {
          title: e,
          repoUrl: url
        };
      }));
    })
    // Write to the db and exit
    .then(function(moduleObjects) {
      moduleObjects.forEach(function(e) {
        Nodemodule.create(e)
          .then(function(){
            console.log(chalk.green('Database seeded. Goodbye!'));
            process.exit(0);
          });
      });
    });
});

function urlCleaner(url) {
 var start;
 var protocol;
 
 if (url.indexOf('https') === 0) return url;
 
 if (url.indexOf("://") > 0) {
    start = url.indexOf("://");
    protocol = url.slice(0, start);
    return "https" + url.slice(start);
 }
 else {
    start = url.indexOf(":") + 1;
    protocol = url.slice(0, start);
    return "https://" + url.slice(start);
 }
}