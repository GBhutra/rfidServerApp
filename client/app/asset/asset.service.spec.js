'use strict';

describe('Service: asset', function() {
  // load the service's module
  beforeEach(module('rfidServerAppApp.asset'));

  // instantiate service
  var asset;
  beforeEach(inject(function(_asset_) {
    asset = _asset_;
  }));

  it('should do something', function() {
    expect(!!asset).to.be.true;
  });
});
