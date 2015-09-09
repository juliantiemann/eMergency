'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('MainCtrl', function ($scope, userService, eventService, geoLocService) {
    $scope.userService = userService;
    $scope.events = [];

    $scope.addEvent = function() {
      eventService.add({});
    }

    eventService.all($scope.events)
      .then(function(response) {
        $scope.events = response;
        
        eventService.subscribe(function(e, event) {
          $scope.events.push(event);
        });

      }, function(error) {
        console.log(error);
      });

      $scope.coords = {};
      geoLocService.get()
        .then(function(location) {
          $scope.coords = location
        }, function(error) {
            console.log(error);
        });


  });
