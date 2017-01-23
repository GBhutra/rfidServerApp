'use strict';

describe('Controller: AssetCtrl', function() {
  // load the controller's module
  beforeEach(module('rfidServerAppApp.asset'));

  var AssetCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    AssetCtrl = $controller('AssetCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
