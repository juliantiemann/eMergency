'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('LoginCtrl', function ($scope, userService) {
    $scope.user = {};
    $scope.password = '';
    $scope.login = function(user,password){
      userService.login(user,password)
        .then(function(){
          window.location.href('/');
        });
    };
  });
