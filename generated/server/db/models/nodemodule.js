//'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  repoUrl: {
    type: String
  }
});

mongoose.model('Nodemodule', schema);