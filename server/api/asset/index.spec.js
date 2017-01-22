'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var assetCtrlStub = {
  index: 'assetCtrl.index',
  show: 'assetCtrl.show',
  create: 'assetCtrl.create',
  upsert: 'assetCtrl.upsert',
  patch: 'assetCtrl.patch',
  destroy: 'assetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var assetIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './asset.controller': assetCtrlStub
});

describe('Asset API Router:', function() {
  it('should return an express router instance', function() {
    expect(assetIndex).to.equal(routerStub);
  });

  describe('GET /api/assets', function() {
    it('should route to asset.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'assetCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/assets/:id', function() {
    it('should route to asset.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'assetCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/assets', function() {
    it('should route to asset.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'assetCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/assets/:id', function() {
    it('should route to asset.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'assetCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/assets/:id', function() {
    it('should route to asset.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'assetCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/assets/:id', function() {
    it('should route to asset.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'assetCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
