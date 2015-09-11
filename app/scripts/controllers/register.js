'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('RegisterCtrl', function ($scope, userService) {
    $scope.user = {};
    $scope.password = '';
    $scope.register = function(user,password) {
      userService.register(user,password)
        .then(function(success){
          window.location.href = '/';
        }, function(error) {
          console.log(error);
        });
    };
  });
