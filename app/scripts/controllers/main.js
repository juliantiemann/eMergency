'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('MainCtrl', function ($scope, $db, userService, eventService, geoLocService, uiGmapIsReady) {
    var createMarker;
    $scope.userService = userService;
    $scope.events = [];
    $scope.markers = [];
    $scope.coords = {};
    $scope.map = {};

    $scope.addEvent = function() {
      eventService.add({});
    }
    console.log("mainctrl");
    eventService.all($scope.events)
      .then(function(response) {
        $scope.events = response;
        angular.forEach(response, function(entry) {
          if(entry.location && entry.location.latitude && entry.location.longitude) {
            $scope.markers.push(createMarker(entry));
          }
        });

        eventService.subscribe(function(e, entry) {
          $scope.events.push(entry);
          if(entry.location && entry.location.latitude && entry.location.longitude) {
            $scope.markers.push(createMarker(entry));
          }
        });

      }, function(error) {
        console.log(error);
      });

    console.log("geoservice.get");

    geoLocService.getStorage()
      .then(function(location) {
        $scope.coords = location;
        $scope.map = {center: {latitude: location.lat, longitude: location.long}, zoom: 14, options:  {scrollwheel: false}};
      });
    geoLocService.get()
      .then(function(location) {
        $scope.coords = location
        $scope.map = {center: {latitude: location.lat, longitude: location.long}, zoom: 14, options:  {scrollwheel: false}};
      }, function(error) {
          console.log(error);
      });

    createMarker = function (entry) {
      var event = {
        id: entry.id,
        latitude: entry.location.latitude,
        longitude: entry.location.longitude,
        icon: 'images/eventtype/' + entry.type.bezeichnung + '.png',
        content: entry.type.bezeichnung + '<br />' + entry.additional,
        show: false
      };
      event.onClick = function() {
        console.log("click");
        event.show = !event.show;
      }
      return event;
    };

  });
