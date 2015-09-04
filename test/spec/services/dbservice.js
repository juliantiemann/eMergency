'use strict';

describe('Service: $db', function () {

  // load the service's module
  beforeEach(module('eMergencyApp'));

  // instantiate service
  var $db;
  beforeEach(inject(function (_$db_) {
    $db = _$db_;
  }));

  it('should do something', function () {
    expect(!!$db).toBe(true);
  });

});
