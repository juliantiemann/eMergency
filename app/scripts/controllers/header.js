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
    $scope.notifications = [
      /*{title: 'Tolles Event1', eventId :'1'}*/
    ];

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.logout = function() {
      userService.logout()
        .then(function(success) {
          $location.path( '/' );
        }, function(error) {
          console.log(error);
        })
    }
  });
