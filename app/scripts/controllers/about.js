'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('AboutCtrl', function () {
    console.log("about");
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
