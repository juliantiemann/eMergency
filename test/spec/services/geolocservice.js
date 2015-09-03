'use strict';

describe('Service: geoLocService', function () {

  // load the service's module
  beforeEach(module('eMergencyApp'));

  // instantiate service
  var geoLocService;
  beforeEach(inject(function (_geoLocService_) {
    geoLocService = _geoLocService_;
  }));

  it('should do something', function () {
    expect(!!geoLocService).toBe(true);
  });

});
