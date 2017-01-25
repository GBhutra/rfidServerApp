'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var assetCtrlStub = {
  index: 'assetCtrl.index',
  locationIndex: 'assetCtrl.locationIndex',
  locationAssetIndex: 'assetCtrl.locationAssetIndex',
  numbers: 'assetCtrl.numbers',
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

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  }
};

// require the index with our stubbed out modules
var assetIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './asset.controller': assetCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Asset API Router:', function() {
  it('should return an express router instance', function() {
    expect(assetIndex).to.equal(routerStub);
  });

  describe('GET /api/assets', function() {
    it('should verify authentication and route to asset.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'assetCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/assets/loc', function() {
    it('should verify authentication and route to asset.controller.locationIndex', function() {
      expect(routerStub.get
        .withArgs('/loc', 'authService.isAuthenticated', 'assetCtrl.locationIndex')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/assets/nums', function() {
    it('should verify authentication and route to asset.controller.numbers', function() {
      expect(routerStub.get
        .withArgs('/nums', 'authService.isAuthenticated', 'assetCtrl.numbers')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/assets/:id', function() {
    it('should verify authentication and route to asset.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'assetCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/assets/loc/:id', function() {
    it('should verify authentication and route to asset.controller.locationAssetIndex', function() {
      expect(routerStub.get
        .withArgs('/loc/:id', 'authService.isAuthenticated', 'assetCtrl.locationAssetIndex')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/assets', function() {
    it('should verify authentication and route to asset.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'assetCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/assets/:id', function() {
    it('should verify authentication and route to asset.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'authService.isAuthenticated', 'assetCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/assets/:id', function() {
    it('should verify authentication and route to asset.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'authService.isAuthenticated', 'assetCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/assets/:id', function() {
    it('should verify authentication and route to asset.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.isAuthenticated', 'assetCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
