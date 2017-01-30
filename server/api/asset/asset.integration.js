'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import User from '../user/user.model';
import request from 'supertest';

var newAsset;

describe('Asset API:', function(done) {
  var user;
  var token;

  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password',
        approved: true
      });

      return user.save();
    });
  });

  // Get the token
  before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

  // Clear users after testing
  after(function() {
    return User.remove();
  });


  describe('GET /api/assets', function() {
    var assets;
    beforeEach(function(done) {
      request(app)
        .get('/api/assets')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          assets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(assets).to.be.instanceOf(Array);
    });
  });

  describe('GET /api/assets/nums', function() {
    var assets;
    beforeEach(function(done) {
      request(app)
        .get('/api/assets/nums')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          assets = res.body;
          console.log(assets);
          done();
        });
    });

    it('should respond with a JSON Object', function() {
      expect(assets).to.be.instanceOf(Object);
    });
  });


  describe('GET /api/assets/loc', function() {
    var locations;
    beforeEach(function(done) {
      request(app)
        .get('/api/assets/loc')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          locations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(locations).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/assets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/assets')
        .set('authorization', `Bearer ${token}`)
        .send({
          "data":{"location":"Riverside","signText":"Stop","image":"1","lat":"30.639117","lon":"-96.4678"},
          "tag":{"epcVal":"0xe200210020005b4d153e0272"}
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAsset = res.body;
          done();
        });
    });

    it('should respond with the newly created asset', function() {
      expect(newAsset.tag.epcVal).to.equal('0xe200210020005b4d153e0272');
    });
  });

  describe('GET /api/assets/:id', function() {
    var asset;

    beforeEach(function(done) {
      request(app)
        .get(`/api/assets/${newAsset._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          asset = res.body;
          done();
        });
    });

    afterEach(function() {
      asset = {};
    });

    it('should respond with the requested asset', function() {
      expect(asset.tag.epcVal).to.equal('0xe200210020005b4d153e0272');
    });
  });

  describe('GET /api/assets/loc/:id', function() {
    var assets;

    beforeEach(function(done) {
      request(app)
        .get(`/api/assets/loc/${newAsset.data.location}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          assets = res.body;
          done();
        });
    });

    afterEach(function() {
      assets = {};
    });

    it('should respond with JSON array', function() {
      expect(assets).to.be.instanceOf(Array);
    });

  });

  describe('PUT /api/assets/:id', function() {
    var updatedAsset;

    beforeEach(function(done) {
      request(app)
        .put(`/api/assets/${newAsset._id}`)
        .set('authorization', `Bearer ${token}`)
        .send({
          "data":{"location":"Riverside123","signText":"Stop","image":"1","lat":"30.639117","lon":"-96.4678"},
          "tag":{"epcVal":"0xe200210020005b4d153e0272"}
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAsset = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAsset = {};
    });

    it('should respond with the updated asset', function() {
      expect(updatedAsset.data.location).to.equal('Riverside123');
      expect(updatedAsset.tag.epcVal).to.equal('0xe200210020005b4d153e0272');
    });

    it('should respond with the updated asset on a subsequent GET', function(done) {
      request(app)
        .get(`/api/assets/${newAsset._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let asset = res.body;

          expect(updatedAsset.data.location).to.equal('Riverside123');
          expect(updatedAsset.tag.epcVal).to.equal('0xe200210020005b4d153e0272');

          done();
        });
    });
  });

  describe('PATCH /api/assets/:id', function() {
    var patchedAsset;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/assets/${newAsset._id}`)
        .set('authorization', `Bearer ${token}`)
        .send([
          { op: 'replace', path: '/data/signText', value: 'YIELD' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAsset = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAsset = {};
    });

    it('should respond with the patched asset', function() {
      expect(patchedAsset.data.signText).to.equal('YIELD');
      expect(patchedAsset.tag.epcVal).to.equal('0xe200210020005b4d153e0272');
    });
  });

  describe('DELETE /api/assets/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/assets/${newAsset._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when asset does not exist', function(done) {
      request(app)
        .delete(`/api/assets/${newAsset._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
