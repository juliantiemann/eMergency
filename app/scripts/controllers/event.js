'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('EventCtrl', function ($scope, $routeParams, $db, geolocationService, eventService) {
    var createMarker, createMap;
    $scope.map = {markers:[]};
    $scope.event = {};

    $scope.update = function(event) {
      eventService.update(event);
    }

    eventService.getById($routeParams.id)
      .then(function(event) {
        createMap(geolocationService.location);
        $scope.map.markers.push(createMarker(event));
        $scope.event = event;
      });

    createMap = function(location) {
      $scope.map.center = {latitude: location.lat, longitude: location.long};
      $scope.map.zoom = 10;
      $scope.map.options = {scrollwheel: false};
    }

    createMarker = function (entry) {
      var marker = {
        id: entry.id,
        latitude: entry.location.latitude,
        longitude: entry.location.longitude,
        icon: 'images/eventtype/' + entry.type.bezeichnung + '.png',
      };
      return marker;
    };

  });
