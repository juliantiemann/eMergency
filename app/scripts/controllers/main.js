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

  });
