'use strict';

describe('Service: Discover', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var Discover;
  beforeEach(inject(function (_Discover_) {
    Discover = _Discover_;
  }));

  it('should do something', function () {
    expect(!!Discover).toBe(true);
  });

});
