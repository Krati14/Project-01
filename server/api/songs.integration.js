'use strict';

var app = require('../..');
import request from 'supertest';

var newsongs;

describe('songs API:', function() {

  describe('GET /api/songss', function() {
    var songss;

    beforeEach(function(done) {
      request(app)
        .get('/api/songss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          songss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      songss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/songss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/songss')
        .send({
          name: 'New songs',
          info: 'This is the brand new songs!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newsongs = res.body;
          done();
        });
    });

    it('should respond with the newly created songs', function() {
      newsongs.name.should.equal('New songs');
      newsongs.info.should.equal('This is the brand new songs!!!');
    });

  });

  describe('GET /api/songss/:id', function() {
    var songs;

    beforeEach(function(done) {
      request(app)
        .get('/api/songss/' + newsongs._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          songs = res.body;
          done();
        });
    });

    afterEach(function() {
      songs = {};
    });

    it('should respond with the requested songs', function() {
      songs.name.should.equal('New songs');
      songs.info.should.equal('This is the brand new songs!!!');
    });

  });

  describe('PUT /api/songss/:id', function() {
    var updatedsongs;

    beforeEach(function(done) {
      request(app)
        .put('/api/songss/' + newsongs._id)
        .send({
          name: 'Updated songs',
          info: 'This is the updated songs!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedsongs = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedsongs = {};
    });

    it('should respond with the updated songs', function() {
      updatedsongs.name.should.equal('Updated songs');
      updatedsongs.info.should.equal('This is the updated songs!!!');
    });

  });

  describe('DELETE /api/songss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/songss/' + newsongs._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when songs does not exist', function(done) {
      request(app)
        .delete('/api/songss/' + newsongs._id)
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
