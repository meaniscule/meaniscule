var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

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
    var createNodemodule = function() {
      return Nodemodule.create({ title: "express", repoUrl: "http://github.com/express" });
    };

    var createBadNodemodule = function() {
      return Nodemodule.create({ repoUrl: "http://github.com/express" });
    };

    var retrieveNodemodule = function() {
      return Nodemodule.find().exec();
    };

    it('should create a module in the db', function(){
      createNodemodule()
        .then(retrieveNodemodule())
        .then(function(moduleArray) {
          expect(moduleArray[0].to.be.an('object'));
          expect(moduleArray[0].title.to.equal('express'));
      });
    });  

    it('should require a title', function(){
      createBadNodemodule()
        .then(function(data) {
          console.log("DATA", data);
          retrieveNodemodule();
        })
        .then(function(moduleArray) {
          console.log(moduleArray);
          //expect(moduleArray.to.be.);
      });
    });  
      
  });
});