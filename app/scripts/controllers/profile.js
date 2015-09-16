'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('ProfileCtrl', function ($scope, userService, Notification) {
    $scope.userService = userService;
    $scope.user = {
      name: userService.user.name,
      username: userService.user.username,
      Skills: userService.user.Skills
    };


    $scope.editUser = function() {
      /*var newEvent = {
        type: eventService.eventTypes[$scope.newEvent.type],
        additional: $scope.newEvent.additional
      };
      eventService.add(newEvent)
        .then(function() {
          $scope.newEvent = {};
          Notification.success('Alarm abgeschickt');
        });
      */
      Notification.success('Profil bearbeitet');
      $scope.userService = userService;
    }

    $scope.cancel = function() {
      debugger
      $scope.userService = userService;
    }
  });
