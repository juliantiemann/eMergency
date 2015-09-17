'use strict';

describe('Directive: absRelTo', function () {

  // load the directive's module
  beforeEach(module('eMergencyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<abs-rel-to></abs-rel-to>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the absRelTo directive');
  // }));
});
