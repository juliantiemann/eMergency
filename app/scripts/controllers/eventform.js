'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:EventformularCtrl
 * @description
 * # EventformularCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('EventFormCtrl', function ($scope, $rootScope, eventService, geolocationService, userService, Notification) {
    $scope.userName = userService.user.username;
    $scope.position = geolocationService.location.lat + ', ' + geolocationService.location.long;
    $scope.newEvent = {};

    $scope.setMyMarker = function () {
      geolocationService.update();
      $rootScope.$on('new-location', function() {
        $scope.position = geolocationService.location.lat + ', ' + geolocationService.location.long;
      });
    };

    $scope.addEvent = function() {
      var newEvent = {
        type: eventService.eventTypes[$scope.newEvent.type],
        additional: $scope.newEvent.additional
      };
      eventService.add(newEvent)
        .then(function() {
          $scope.newEvent = {};
          Notification.success('Alarm abgeschickt');
        });
      $scope.newEvent = {};
    }

    $scope.cancel = function() {
      $scope.newEvent = {};
    }

    $scope.quickEvent = function (type) {
      if(type == 'handwerk') {
        $scope.newEvent.type = "handwerk";
        $('#additional').focus();
      } else {
        $scope.newEvent = {
          type: type,
          additional: 'Quick Event! EMERGENCY!!!'
        };
        $scope.addEvent();
      }
    }
  });
