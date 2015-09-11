'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('EventCtrl', function ($scope, eventService, geoLocService, userService) {
    $scope.userName = userService.user.username;
    

    $scope.setMyMarker = function () {
      geoLocService.get()
        .then(function(location) {
          $scope.coords = location;
          $scope.map.myMarker = {
            id: "myMarker",
            latitude: location.lat,
            longitude: location.long
          };
        }, function(error) {
          console.log(error);
        });
    };

    $scope.quickEvent = function (type) {
      if(type == 'handwerk') {
        $scope.eventType = "handwerk";
        $('#description').focus();
      }
      else {
        var newEvent = {
          type: eventService.eventTypes[type],
          location: $scope.map.myMarker.latitude + ';' + $scope.map.myMarker.longitude,
          additional: 'Quick Event! EMERGENCY!!!',
          user: userService.user.id
        };
        eventService.add(newEvent);
      }
    };
  });
