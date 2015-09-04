'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('HeaderCtrl', function ($scope, $db, userService) {
    $scope.userService = userService;
  });
