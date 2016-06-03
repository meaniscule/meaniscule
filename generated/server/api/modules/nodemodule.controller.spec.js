var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests',
    clearDB = require('mocha-mongoose')(dbURI),
    expect = require('chai').expect,
    supertest = require('supertest'),
    app = require('../../app'),
    Nodemodule = require('./nodemodule.model'),
    nodemoduleController = require('./nodemodule.controller');

describe('/api/nodemodule', function () {
    var currentModule,
        userAgent;

    before('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    before('Create node module', function(done) {
        NodeModule.create({ title: 'express', repoUrl: 'http://github.com/express' })
            .then(function(nodeModule) {
                createdModule = nodeModule;
            });
    });

    before('Create user agent', function(done) {
        userAgent = supertest.agent(app);
    });

    after('Clear test database', function (done) {
        clearDB(done);
    });


    describe('GET all node modules', function(done) {
        it('should get a 200 respone and return an array', function(done) {
            userAgent.get('/api/nodemodule')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done();

                    expect(res.body).to.be.an('array');
                    expect(res.body[0]._id).to.equal(currentModule._id.toString());
                    done();
                });
        });
    });

    describe('POST a new module', function(done) {
        it('should get a 201 response and return a module', function(done) {
            userAgent.post('/api/nodemodule')
                .send({ title: 'bluebird', repoUrl: 'http://github.com/bluebird'})
                .expect(201)
                .end(function(err, res) {
                    if (err) return done();

                    Nodemodule.find()
                        .then(function(nodeModules, err) {
                            if (err) return done();

                            expect(res.body._id).to.equal(nodeModules[1]._id.toString());
                            expect(res.body.title).to.equal('bluebird');
                            done();
                        });
                });
        });
    });
});
