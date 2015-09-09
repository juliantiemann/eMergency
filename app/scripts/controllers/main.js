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
    $scope.eventsPaginated = [];

    $scope.addEvent = function() {
      eventService.add({});
    }

    $scope.paginateEvents = function() {
      console.log($scope.eventsPaginated);
      var lastTimestamp = new Date($scope.eventsPaginated[$scope.eventsPaginated.length-1].date).getTime();
      eventService.paginate(lastTimestamp, 5)
        .then(function(response){
          angular.forEach(response, function(event) {
            $scope.eventsPaginated.push(event);
          });
        });
    }

    eventService.paginate(new Date().getTime(), 5)
      .then(function(response) {
        $scope.eventsPaginated = response;
      })

    eventService.all($scope.events)
      .then(function(response) {
        //laden aller Events aus der DB
        $scope.events = response;

        //hinzufuegen von neuen Events
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
