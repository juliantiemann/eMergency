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
    var createMarker, createMap;
    $scope.userService = userService;
    $scope.events = [];
    $scope.eventsPaginated = [];
    $scope.coords = {};
    $scope.map = {markers:[]};

    $scope.addEvent = function() {
      var bla = {location:$scope.coords.lat + ";" + $scope.coords.long};
      console.log(bla);
      eventService.add(bla);
    }

    $scope.paginateEvents = function() {
      var lastTimestamp = new Date($scope.events[$scope.events.length-1].date).getTime();
      eventService.load(lastTimestamp, 5)
        .then(function(response){
          angular.forEach(response, function(event) {
            $scope.events.push(event);
          });
        });
    }

    $scope.$watch('selected', function(fac) {
       $scope.$broadcast("rowSelected", fac);
    });

    eventService.load(new Date().getTime(), 5)
      .then(function(response) {
        //laden aller Events aus der DB
        $scope.events = response;

        uiGmapIsReady.promise()
          .then(function() {
            angular.forEach(response, function(entry) {
              if(entry.location && entry.location.latitude && entry.location.longitude) {
                $scope.map.markers.push(createMarker(entry));
              }
            });
          });

        eventService.subscribe(function(e, entry) {
          $scope.events.unshift(entry);
          if(entry.location && entry.location.latitude && entry.location.longitude) {
            $scope.map.markers.push(createMarker(entry));
          }
        });

      }, function(error) {
        console.log(error);
      });

    geoLocService.getStorage()
      .then(function(location) {
        $scope.coords = location;
        createMap(location);
      });

    geoLocService.get()
      .then(function(location) {
        $scope.coords = location
        createMap(location);
      }, function(error) {
          console.log(error);
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
        content: entry.type.bezeichnung + '<br />' + entry.additional,
        showWindow: false
      };
      return marker;
    };

  });
