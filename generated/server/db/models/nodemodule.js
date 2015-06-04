//'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: {
    type: String
  },
  repoUrl: {
    type: String
  }
});

mongoose.model('Nodemodule', schema);