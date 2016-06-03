var mongoose = require('mongoose');
var NodeModule = require('./nodemodule.model');

module.exports = {
	index: _index,
	create: _create
}

function _index(req, res, next) {
	NodeModule
		.find()
		.exec()
		.then(function(nodeModules) {
			res.send(nodeModules);
		});
}

function _create(req, res, next) {
	NodeModule
		.create(req.body, function(err, nodeModule){
			if(err) {
				res.status(400).send(err);
			}

			res.status(201).send(nodeModule);
		});
}