'use strict';

var app = require('../..');
import request from 'supertest';

var newband;

describe('band API:', function() {

  describe('GET /api/bands', function() {
    var bands;

    beforeEach(function(done) {
      request(app)
        .get('/api/bands')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bands = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bands.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bands', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bands')
        .send({
          name: 'New band',
          info: 'This is the brand new band!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newband = res.body;
          done();
        });
    });

    it('should respond with the newly created band', function() {
      newband.name.should.equal('New band');
      newband.info.should.equal('This is the brand new band!!!');
    });

  });

  describe('GET /api/bands/:id', function() {
    var band;

    beforeEach(function(done) {
      request(app)
        .get('/api/bands/' + newband._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          band = res.body;
          done();
        });
    });

    afterEach(function() {
      band = {};
    });

    it('should respond with the requested band', function() {
      band.name.should.equal('New band');
      band.info.should.equal('This is the brand new band!!!');
    });

  });

  describe('PUT /api/bands/:id', function() {
    var updatedband;

    beforeEach(function(done) {
      request(app)
        .put('/api/bands/' + newband._id)
        .send({
          name: 'Updated band',
          info: 'This is the updated band!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedband = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedband = {};
    });

    it('should respond with the updated band', function() {
      updatedband.name.should.equal('Updated band');
      updatedband.info.should.equal('This is the updated band!!!');
    });

  });

  describe('DELETE /api/bands/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bands/' + newband._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when band does not exist', function(done) {
      request(app)
        .delete('/api/bands/' + newband._id)
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
