var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

var Nodemodule = require('./nodemodule.model.js');

describe('Nodemodule model', function () {
  before('Connect to db', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  after('Clear test database', function (done) {
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
