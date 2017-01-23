'use strict';

describe('Component: AssetComponent', function() {
  // load the controller's module
  beforeEach(module('rfidServerAppApp.asset'));

  var AssetComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AssetComponent = $componentController('asset', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
