'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('HeaderCtrl', function ($scope, $db, $location, userService, $rootScope) {
    $scope.userService = userService;
    $scope.notifications = [];

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.logout = function() {
      userService.logout()
        .then(function(success) {
          $location.path( '/' );
        }, function(error) {
          console.log(error);
        })
    }

    $rootScope.$on('new-event', function(e, entry) {
      if(entry.user.id !== userService.user.id && userService.user.Skills[entry.type.bezeichnung]) {
        $scope.notifications.push({title: entry.type.bezeichnung, event_id: entry.id});
        console.log($scope.notifications);
      }
    });
  });
