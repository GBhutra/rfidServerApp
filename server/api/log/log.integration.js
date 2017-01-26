'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import Log from './log.model';
import User from '../user/user.model';
import request from 'supertest';

var newLog;

describe('Log API:', function() {
  var user;
  var token;

  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        role: 'admin',
        password: 'password',
        approved: true
      });

      return user.save();
    });
  });

  // Get the authentication token
  before(function(done) {
      Log.remove();
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

  describe('GET /api/logs', function() {
    var logs;
    
    beforeEach(function(done) {
      request(app)
        .get('/api/logs')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          logs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(logs).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/logs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/logs')
        .set('authorization', `Bearer ${token}`)
        .send({
          "tag":{"epcVal":"0xe200210020005b4d153e0272"},
          "logData":{"location":"Riverside","signText":"Stop","lat":"30.639117","lon":"-96.4678","date":"","readCount":"5"}
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLog = res.body;
          done();
        });
    });

    it('should respond with the newly created log', function() {
      expect(newLog.logData.location).to.equal('Riverside');
      expect(newLog.tag.epcVal).to.equal('0xe200210020005b4d153e0272');
    });
  });

  describe('GET /api/logs/:id', function() {
    var log;

    beforeEach(function(done) {
      request(app)
        .get(`/api/logs/${newLog._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          log = res.body;
          done();
        });
    });

    afterEach(function() {
      log = {};
    });

    it('should respond with the requested log', function() {
      expect(log.logData.readCount).to.equal(5);
      expect(log.tag.epcVal).to.equal('0xe200210020005b4d153e0272');
    });
  });


  describe('PUT /api/logs/:id', function() {
    var updatedLog;

    beforeEach(function(done) {
      request(app)
        .put(`/api/logs/${newLog._id}`)
        .set('authorization', `Bearer ${token}`)
        .send({
          "tag":{"epcVal":"0xe200210020005b4d153e0272"},
          "logData":{"location":"Riverside","signText":"Stop","lat":"30.639117","lon":"-96.4678","date":"","readCount":"6"}
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLog = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLog = {};
    });

    it('should respond with the updated log', function() {
      expect(updatedLog.logData.readCount).to.equal(6);
      expect(updatedLog.tag.epcVal).to.equal('0xe200210020005b4d153e0272');
    });

    it('should respond with the updated log on a subsequent GET', function(done) {
      request(app)
        .get(`/api/logs/${newLog._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let log = res.body;

          expect(log.logData.readCount).to.equal(6);
          expect(log.tag.epcVal).to.equal('0xe200210020005b4d153e0272');

          done();
        });
    });
  });

  describe('PATCH /api/logs/:id', function() {
    var patchedLog;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/logs/${newLog._id}`)
        .send([
          { op: 'replace', path: '/logData/signText', value: 'YIELD' }
        ])
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLog = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLog = {};
    });

    it('should respond with the patched log', function() {
      expect(patchedLog.logData.signText).to.equal('YIELD');
    });
  });

  describe('DELETE /api/logs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/logs/${newLog._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when log does not exist', function(done) {
      request(app)
        .delete(`/api/logs/${newLog._id}`)
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