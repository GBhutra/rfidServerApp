'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import User from '../user/user.model';
import request from 'supertest';

var newThing;

describe('Thing API:', function() {
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

  describe('GET /api/things', function() {
    var things;

    beforeEach(function(done) {
      request(app)
        .get('/api/things')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          things = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(things).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/things', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/things')
        .set('authorization', `Bearer ${token}`)
        .send({
          friendlyname: 'New Thing',
          macAddress: '1234905729507957638753',
          ipAddress: '192.168.1.20'

        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newThing = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newThing.friendlyname).to.equal('New Thing');
      expect(newThing.macAddress).to.equal('1234905729507957638753');
    });
  });

  describe('GET /api/things/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/things/${newThing._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          thing = res.body;
          done();
        });
    });

    afterEach(function() {
      thing = {};
    });

    it('should respond with the requested thing', function() {
      expect(thing.friendlyname).to.equal('New Thing');
      expect(thing.macAddress).to.equal('1234905729507957638753');
    });
  });

  describe('PUT /api/things/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put(`/api/things/${newThing._id}`)
        .set('authorization', `Bearer ${token}`)
        .send({
          macAddress: '1234905729507957123753',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated thing', function() {
      expect(updatedThing.friendlyname).to.equal('New Thing');
      expect(updatedThing.macAddress).to.equal('1234905729507957123753');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/things/${newThing._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.friendlyname).to.equal('New Thing');
          expect(thing.macAddress).to.equal('1234905729507957123753');

          done();
        });
    });
  });

  describe('PATCH /api/things/:id', function() {
    var patchedThing;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/things/${newThing._id}`)
        .set('authorization', `Bearer ${token}`)
        .send([
          { op: 'replace', path: '/ipAddress', value: '192.168.1.212' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedThing = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedThing.friendlyname).to.equal('New Thing');
      expect(patchedThing.ipAddress).to.equal('192.168.1.212');
    });
  });

  describe('DELETE /api/things/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/things/${newThing._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thing does not exist', function(done) {
      request(app)
        .delete(`/api/things/${newThing._id}`)
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
