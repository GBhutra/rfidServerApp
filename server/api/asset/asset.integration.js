'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAsset;
var token;

describe('Asset API:', function(done) {
  describe('GET /api/assets', function() {
    var assets;

    before(function() {
    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.save();
    });
    //Logging in creating and getting the token
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
      }
    });

    it('should respond with JSON array', function() {
      expect(assets).to.be.instanceOf(Array);
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
        .set('authorization', `Bearer ${token}`)
        .delete(`/api/assets/${newAsset._id}`)
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
