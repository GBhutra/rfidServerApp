'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var logCtrlStub = {
  index: 'logCtrl.index',
  show: 'logCtrl.show',
  create: 'logCtrl.create',
  upsert: 'logCtrl.upsert',
  patch: 'logCtrl.patch',
  destroy: 'logCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

// require the index with our stubbed out modules
var logIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './log.controller': logCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Log API Router:', function() {
  it('should return an express router instance', function() {
    expect(logIndex).to.equal(routerStub);
  });

  describe('GET /api/logs', function() {
    it('should be authenticated route to log.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'logCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/logs/:id', function() {
    it('should be authenticated route to log.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'logCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/logs', function() {
    it('should be authenticated route to log.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'logCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  /*
  describe('PUT /api/logs/:id', function() {
    it('should route to log.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'logCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/logs/:id', function() {
    it('should route to log.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'logCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/logs/:id', function() {
    it('should route to log.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'logCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });*/

});
