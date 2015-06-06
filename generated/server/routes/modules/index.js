//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
//require('..//models/nodemodule');
var NodeModule = mongoose.model('Nodemodule');

module.exports = router;

router.get('/', function (req, res) {
  console.log("GET modules/");
  NodeModule
    .find()
    .exec()
    .then(function(nodeModules) {
      res.send(nodeModules);
    });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  
  NodeModule
    .create(req.body, function(err, nodeModule){
      if(err) return next(err);
      res.send(nodeModule);
    });
});