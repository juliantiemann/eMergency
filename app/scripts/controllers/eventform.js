'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:EventformularCtrl
 * @description
 * # EventformularCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('EventFormCtrl', function ($scope, eventService, geolocationService, userService) {
    $scope.userName = userService.user.username;
    $scope.position = geolocationService.location.lat + ', ' + geolocationService.location.long;
    $scope.newEvent = {};

    $scope.setMyMarker = function () {
      geolocationService.get()
        .then(function(location) {
          $scope.map.myMarker = {
            id: "myMarker",
            latitude: location.lat,
            longitude: location.long
          };
          $scope.position = geolocationService.location.lat + ', ' + geolocationService.location.long;
        }, function(error) {
          console.log(error);
        });
    };

    $scope.addEvent = function() {
      var newEvent = {
        type: eventService.eventTypes[$scope.newEvent.type],
        additional: $scope.newEvent.additional
      };
      eventService.add(newEvent);
      $scope.newEvent = {};
    }

    $scope.cancel = function() {
      $scope.newEvent = {};
    }

    $scope.quickEvent = function (type) {
      if(type == 'handwerk') {
        $scope.newEvent.type = "handwerk";
        $('#description').focus();
      }
      else {
        $scope.newEvent = {
          type: type,
          additional: 'Quick Event! EMERGENCY!!!'
        };
        $scope.addEvent();
      }
    }
  });
