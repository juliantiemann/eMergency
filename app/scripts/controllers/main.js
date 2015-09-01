'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('MainCtrl', function ($scope, eventService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.events = [];

    $scope.addEvent = function() {
      eventService.add({});
    }

    eventService.all($scope.events)
      .then(function(response) {
        $scope.events = response;

        eventService.subscribe(function(e, event) {
          $scope.events.push(event);
        });

      }, function(error) {
        console.log(error);
      });

      $scope.lat = "0";
      $scope.lng = "0";
      $scope.accuracy = "0";
      $scope.error = "";

      $scope.showResult = function () {
          return $scope.error == "";
      }

      $scope.showPosition = function (position) {
          $scope.lat = position.coords.latitude;
          $scope.lng = position.coords.longitude;
          $scope.accuracy = position.coords.accuracy;
          $scope.$apply();
      }

      $scope.showError = function (error) {
          switch (error.code) {
              case error.PERMISSION_DENIED:
                  $scope.error = "User denied the request for Geolocation."
                  break;
              case error.POSITION_UNAVAILABLE:
                  $scope.error = "Location information is unavailable."
                  break;
              case error.TIMEOUT:
                  $scope.error = "The request to get user location timed out."
                  break;
              case error.UNKNOWN_ERROR:
                  $scope.error = "An unknown error occurred."
                  break;
          }
          $scope.$apply();
      }

      $scope.getLocation = function () {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
          }
          else {
              $scope.error = "Geolocation is not supported by this browser.";
          }
      }

      $scope.getLocation();

  });
