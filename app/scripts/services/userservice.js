'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.userService
 * @description
 * # userService
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('userService', function ($q, $rootScope) {
    return {
      getCurrentUser: function() {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              if($rootScope.DB.User.me) {
                resolve($rootScope.DB.User.me);
              } else {
                reject();
              }
            });
        });
      },
      register: function(newUser, password) {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              $rootScope.DB.User.register(newUser, password)
                .then(
                  function(success) {
                    resolve(success);
                  },
                  function(error) {
                    reject(error);
                  }
                );
            });
        });
      },
      login: function(user, password) {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              $rootScope.DB.User.login(user, password)
                .then(
                  function(success) {
                    resolve(success);
                  },
                  function(error) {
                    reject(error);
                  }
                );
            });
        });
      },
      logout: function() {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              $rootScope.DB.User.logout()
                .then(
                  function(success) {
                    resolve(success);
                  },
                  function(error) {
                    reject(error);
                  }
                );
            });
        });
      }
    }
  });
