'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('MainCtrl', function ($scope, $rootScope, $db, $location, userService, eventService, geolocationService, Notification) {
    var createMarker, createMap, userPosition;
    $scope.userService = userService;
    $scope.events = [];
    $scope.map = {markers:[], myMarker:[]};


    $scope.go = function ( path ) {
      $location.path( path );
    };

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

        angular.forEach(response, function(entry) {
          if(entry.location && entry.location.latitude && entry.location.longitude) {
            $scope.map.markers.push(createMarker(entry));
          }
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


    createMap = function(location) {
      if(location) {
        $scope.map.center = {latitude: location.lat, longitude: location.long};
        $scope.map.zoom = 12;
        $scope.map.options = {scrollwheel: false};
        userPosition(geolocationService.location);
      }
    }

    userPosition = function(location) {
      if(location) {
        $scope.map.myMarker = {
          id: "myMarker",
          latitude: location.lat,
          longitude: location.long,
          options: {zIndex: 1000}
        };
      }
    }

    createMarker = function (entry) {
      var marker = {
        id: entry.id,
        latitude: entry.location.latitude,
        longitude: entry.location.longitude,
        icon: 'images/map/' + entry.type.bezeichnung + '.png',
        content: entry.type.bezeichnung + '<br />' + entry.additional,
        showWindow: false
      };
      return marker;
    };

    $rootScope.$on('new-location', function() {
      createMap(geolocationService.location);
    });

    createMap(geolocationService.location);
  });
