'use strict';

const dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
const clearDB = require('mocha-mongoose')(dbURI);
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Nodemodule = require('./nodemodule.model.js');

describe('Nodemodule model', function () {

	before('Connect to db', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	after('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Model existence', function() {

		it('should exist', function () {
	  		expect(Nodemodule).to.be.a('function');
		});
	});

	describe('Nodemodule creation', function() {

		it('should create a module in the db', function(done) {

			Nodemodule.create({ title: "express", repoUrl: "http://github.com/express" })
				.then(function(data) {
			  		Nodemodule.findById(data.id).exec()
						.then(function(data) {
				  			expect(data).to.be.a('object');
				  			expect(data.title).to.equal("express");
				  			expect(data.repoUrl).to.equal("http://github.com/express");
				  			done();
						})
						.then(null, done);
				});

		});

		it('should not be able to create a module without a title', function(done) {

		  	Nodemodule.create({ repoUrl: "http://github.com/express" })
				.then(function(data) {
			  		expect(data).to.not.exist;
				})
				.then(null, function(err) {
			  		expect(err).to.exist;
			  		expect(err.name).to.equal("ValidationError");
			  		done();
				})
				.then(null, done);

		});
	  
	});
});