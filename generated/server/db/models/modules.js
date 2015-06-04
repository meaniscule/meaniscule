'use strict';

var mongoose = require('mongoose');

var moduleSchema = new mongoose.Schema({
  title: {
    type: String
  },
  repoUrl: {
    type: String
  }
});

mongoose.model('Module', moduleSchema);