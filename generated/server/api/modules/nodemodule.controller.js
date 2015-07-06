var mongoose = require('mongoose');
var NodeModule = require('./nodemodule.model');

module.exports = {
  index: function (req, res) {
    NodeModule
      .find()
      .exec()
      .then(function(nodeModules) {
        res.send(nodeModules);
      });
 },
 create: function(req, res, next) {
    NodeModule
      .create(req.body, function(err, nodeModule){
        if(err) return next(err);
        res.send(nodeModule);
      });
  } 
}

