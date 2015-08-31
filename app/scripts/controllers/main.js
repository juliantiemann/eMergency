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

    eventService.all($scope.events)
      .then(function(response) {
        $scope.events = response;
      }, function(error) {
        console.log(error);
      });

    eventService.subscribe(function(e, event) {
      $scope.events.push(event);
    });

  });
