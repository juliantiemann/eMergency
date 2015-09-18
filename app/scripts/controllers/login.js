'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('LoginCtrl', function ($rootScope, $scope, userService, $location) {
    $scope.user = '';
    $scope.password = '';
    $scope.error = false;
    $scope.login = function(user,password) {
      userService.login(user,password)
        .then(function(success){
          $scope.error = false;
          $location.path( '/' );
        }, function(error) {
          $scope.error = true;
          console.log(error);
        });
    };
  });
