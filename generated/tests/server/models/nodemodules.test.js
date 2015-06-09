var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/nodemodule');

var Nodemodule = mongoose.model('Nodemodule');

describe('Nodemodule model', function () {
  beforeEach('Connect to db', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
      expect(Nodemodule).to.be.a('function');
  });

  describe('Nodemodule creation', function() {

    it('should create a module in the db', function(done){

      Nodemodule.create({ title: "express", repoUrl: "http://github.com/express" })
        .then(function(data) {
          Nodemodule.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        });
    });  
      
  });
});