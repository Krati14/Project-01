'use strict';

var app = require('../..');
import request from 'supertest';

var newsinger;

describe('singer API:', function() {

  describe('GET /api/singers', function() {
    var singers;

    beforeEach(function(done) {
      request(app)
        .get('/api/singers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          singers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      singers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/singers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/singers')
        .send({
          name: 'New singer',
          info: 'This is the brand new singer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newsinger = res.body;
          done();
        });
    });

    it('should respond with the newly created singer', function() {
      newsinger.name.should.equal('New singer');
      newsinger.info.should.equal('This is the brand new singer!!!');
    });

  });

  describe('GET /api/singers/:id', function() {
    var singer;

    beforeEach(function(done) {
      request(app)
        .get('/api/singers/' + newsinger._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          singer = res.body;
          done();
        });
    });

    afterEach(function() {
      singer = {};
    });

    it('should respond with the requested singer', function() {
      singer.name.should.equal('New singer');
      singer.info.should.equal('This is the brand new singer!!!');
    });

  });

  describe('PUT /api/singers/:id', function() {
    var updatedsinger;

    beforeEach(function(done) {
      request(app)
        .put('/api/singers/' + newsinger._id)
        .send({
          name: 'Updated singer',
          info: 'This is the updated singer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedsinger = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedsinger = {};
    });

    it('should respond with the updated singer', function() {
      updatedsinger.name.should.equal('Updated singer');
      updatedsinger.info.should.equal('This is the updated singer!!!');
    });

  });

  describe('DELETE /api/singers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/singers/' + newsinger._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when singer does not exist', function(done) {
      request(app)
        .delete('/api/singers/' + newsinger._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
