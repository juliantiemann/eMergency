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
    $scope.register = function(user,password) {
      userService.register(user,password)
        .then(function(success){
          $location.path('#/');
        }, function(error) {
          console.log(error);
        });
    };
  });
