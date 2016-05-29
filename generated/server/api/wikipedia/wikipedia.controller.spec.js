'use strict';

const request = require('supertest');

describe('Wikipedia routes', function() {

	let server;

	beforeEach(function() {
		server = require('../../app');
	});

	describe('GET /api/wikipedia/random', function() {

		it('responds with a 200', function(done) {
			request(server)
				.get('/api/wikipedia/random')
				.expect(200, done);
		});

		it('responds with 1 article by default', function(done) {
			request(server)
				.get('/api/wikipedia/random')
				.expect(function(res) {
					if (Object.keys(res.body).length !== 1) {
						console.log('here')
						throw new Error('Not enough articles in response')
					}
				})
				.end(done);
		});

		it('responds with multiple articles with URL query', function(done) {
			request(server)
				.get('/api/wikipedia/random?num=3')
				.expect(function(res) {
					if (Object.keys(res.body).length !== 3) {
						console.log('here')
						throw new Error('Not enough articles in response')
					}
				})
				.end(done);
		});

	});


});