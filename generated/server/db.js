var Promise = require('bluebird');
var chalk = require('chalk');
var dbName = "meaniscule-app";

var DATABASE_URI = "mongodb://localhost:27017/" + dbName;

var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});


console.log('Starting MongoDB...');

startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened! dbName:'), chalk.magenta(dbName));
});


module.exports = startDbPromise;

