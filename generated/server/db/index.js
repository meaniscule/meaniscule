var DATABASE_URI = "mongodb://localhost:27017/meaniscule-app";

var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

