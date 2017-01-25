'use strict';

describe('Controller: AssetLocCtrl', function() {
  // load the controller's module
  beforeEach(module('rfidServerAppApp.assetLoc'));

  var AssetLocCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    AssetLocCtrl = $controller('AssetLocCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
