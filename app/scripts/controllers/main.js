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
        angular.forEach(response, function(entry) {
          if(entry.location.latitude && entry.location.longitude) {
            var event = {
              id: entry.id,
              latitude: entry.location.latitude,
              longitude: entry.location.longitude,
              icon: 'images/eventtype/' + entry.type.bezeichnung + '.png',
              content: '<h3>' + entry.type.bezeichnung + '</h3>' + entry.additional,
              show: false
            };
            event.onClick = function() {
              event.show = !event.show;
            }
            $scope.events.push(event);
          }
        });
        eventService.subscribe(function(e, entry) {
          if(entry.location.latitude && entry.location.longitude) {
            var event = {
              id: entry.id,
              latitude: entry.location.latitude,
              longitude: entry.location.longitude,
              icon: 'images/eventtype/' + entry.type.bezeichnung + '.png',
              content: '<h3>' + entry.type.bezeichnung + '</h3>' + entry.additional,
              show: false
            };
            event.onClick = function() {
              event.show = !event.show;
            }
            $scope.events.push(event);
          }
        });

      }, function(error) {
        console.log(error);
      });

    $scope.coords = {};
    $scope.map = {};
    geoLocService.get()
      .then(function(location) {
        $scope.coords = location
        $scope.map = {center: {latitude: location.lat, longitude: location.long}, zoom: 14, options:  {scrollwheel: false}};
      }, function(error) {
          console.log(error);
      });

  });
