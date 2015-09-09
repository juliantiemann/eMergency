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

    $scope.paginateEvents = function(lastId, resultsPerPage){
        if($scope.eventsPaginated.length = 0){
          $scope.eventsPaginated = eventService.paginate(1,5);
        } else {
          eventService.paginate(lastId, resultsPerPage)
          .then(function(response){
            $scope.eventsPaginated.push(response);
          })
        }
    }

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
