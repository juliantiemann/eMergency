'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('HeaderCtrl', function ($scope, $db, $location, userService) {
    $scope.userService = userService;

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.logout = function() {
      userService.logout()
        .then(function(success) {
          window.location.href = '/';
        }, function(error) {
          console.log(error);
        })
    }
  });
