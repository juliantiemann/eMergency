'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('RegisterCtrl', function ($scope, userService, $location) {
    $scope.user = {};
    $scope.password = '';
    $scope.error = false;
    $scope.register = function(user,password) {
      userService.register(user,password)
        .then(function(success){
          $scope.error = false;
          $location.path( '/' );
        }, function(error) {
          $scope.error = true;
          console.log(error);
        });
    };
  });
