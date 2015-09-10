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

      $scope.$watch('selected', function(fac) {
         $scope.$broadcast("rowSelected", fac);
      });

    eventService.all($scope.events)
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
          $scope.events.push(entry);
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
      $scope.map.zoom = 12;
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
