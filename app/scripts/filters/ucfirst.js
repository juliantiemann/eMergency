'use strict';

/**
 * @ngdoc filter
 * @name eMergencyApp.filter:ucfirst
 * @function
 * @description
 * # ucfirst
 * Filter in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .filter('ucfirst', function () {
    return function(input,arg) {
  		return input.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  	};
  });
