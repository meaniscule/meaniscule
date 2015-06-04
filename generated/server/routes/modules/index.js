//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
//require('..//models/nodemodule');
var NodeModule = mongoose.model('Nodemodule');

module.exports = router;

router.get('/', function (req, res) {
  NodeModule
    .find()
    .exec()
    .then(function(nodeModules) {
      res.send(nodeModules);
    });
});