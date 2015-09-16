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
    $scope.password = {};

    var update = function() {
      debugger
      userService.update(userService.user)
        .then(function() {
          Notification.success('Profil gespeichert');
        });
    }

    $scope.editUser = function() {
      if( $scope.password.length ) {
        if( $scope.password.new == $scope.password.confirm ) {
          userService.user.password = $scope.password.new;
          update();
        } else {
          Notification.error('Passwörter stimmen nicht überein');
        }
      } else {
        update();
      }
    }
  });
