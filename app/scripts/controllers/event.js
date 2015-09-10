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

    $scope.setMyMarker = function () {
      geoLocService.getStorage()
        .then(function(location) {
          $scope.coords = location;
          $scope.map.myMarker = {
            id: "myMarker",
            latitude: location.lat,
            longitude: location.long
          };
        });
    };

    $scope.quickEvent = function (type) {
      debugger
      var newEvent = {
        type: eventService.eventTypes[type],
        location: $scope.map.myMarker.latitude + ';' + $scope.map.myMarker.longitude,
        additional: 'Quick Event! EMERGENCY!!!',
        user: userService.user.id
      };
      debugger
      eventService.add(newEvent);
    };
  });
