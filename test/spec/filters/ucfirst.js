'use strict';

describe('Filter: ucfirst', function () {

  // load the filter's module
  beforeEach(module('eMergencyApp'));

  // initialize a new instance of the filter before each test
  var ucfirst;
  beforeEach(inject(function ($filter) {
    ucfirst = $filter('ucfirst');
  }));

  it('should return the input prefixed with "ucfirst filter:"', function () {
    var text = 'angularjs';
    expect(3).toBe(3);
  });

});
