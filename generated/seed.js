var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var mongoose = require('mongoose');
var startDb = require('./server/db');
var Nodemodule = mongoose.model('Nodemodule');
var chalk = require('chalk');

var moduleNamesArray;

startDb.then(function(){
  fs.readdirAsync(__dirname + '/node_modules/')
    .then(function(moduleNames) {
      moduleNamesArray = moduleNames.filter(function(e) {
        return e !== ".bin";
      });
      
      moduleNamesArray.forEach(function(e) {
        Nodemodule.create({title: e})
          .then(function(){
            console.log(chalk.green('Database seeded. Goodbye!'));
            process.exit(1);
          });
      });

      //return fs.readFileAsync(path.join(__dirname, '/node_modules/' + 'npm' + '/package.json'), {'encoding': 'utf8'});

      // return moduleNamesArray.map(function(e) {
      //   if (e !== '.bin') {
      //     return fs.readFileAsync(path.join(__dirname, '/node_modules/' + e + '/package.json'));
      //   }
      // });
      // return Promise.all(moduleNamesArray.map(function(module){
      //   if (module !== '.bin') {
      //     return fs.readFileAsync(path.join(__dirname, '/node_modules/' + module + '/package.json'), {'encoding': 'utf8'});
      //   }
      // }));
    });
});