'use strict';

var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests',
	clearDB = require('mocha-mongoose')(dbURI),
	expect = require('chai').expect,
	mongoose = require('mongoose'),
	supertest = require('supertest'),
	app = require('../../app'),
	NodeModule = require('./nodemodule.model'),
	nodemoduleController = require('./nodemodule.controller');

describe('Module routes', function() {
	let userAgent = supertest.agent(app);

	let tempModule = { title: 'express', repoUrl: 'http://github.com/express' };
	let createdModule;

	before('Establish DB connection', function(done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	beforeEach('Create node module', function(done) {
		NodeModule.create(tempModule)
			.then(function(_createdModule) {
				expect(_createdModule.title).to.equal(tempModule.title);
				createdModule = _createdModule;
				done();
			})
			.catch(function(err) {
				done(err);
			});
	});

	afterEach('Clear test database', function(done) {
		clearDB(done);
	});

	describe('GET /api/modules', function(done) {
		it('gets a 200 response and return an array', function(done) {
			userAgent.get('/api/modules')
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);

					expect(res.body).to.be.an('array');
					expect(res.body[0]._id).to.exist;
					expect(res.body[0]._id).to.equal(createdModule.id);
					done();
				});
		});
	});

	describe('POST /api/modules', function(done) {
		let testPostModule = {title: 'bluebird', repoUrl: 'http://github.com/bluebird'};
		let junkPostModule = {repoUrl: 'http://github.com/bluebird'};

		it('gets a 201 response and return a module', function(done) {
			userAgent.post('/api/modules')
				.send(testPostModule)
				.expect(201)
				.end(function(err, res) {
					if (err) return done(err);

					NodeModule.findOne({ title: testPostModule.title})
						.then(function(foundNodeModule) {
							expect(res.body._id).to.equal(foundNodeModule._id.toString());
							expect(res.body.title).to.exist;
							expect(res.body.title).to.equal(foundNodeModule.title);
							done();
						})
						.catch(function(err) {
							done(err);
						});
				});
		});

		it('gets a 400 for modules with no title', function(done) {
			userAgent.post('/api/modules')
				.send(junkPostModule)
				.expect(400)
				.end(function(err, res) {
					if (err) return done(err);
					expect(res.body.name).to.equal('ValidationError');
					done();
				});
		});
	});
});
