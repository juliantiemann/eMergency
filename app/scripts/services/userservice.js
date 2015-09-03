'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.userService
 * @description
 * # userService
 * Service for user management in baqend in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('userService', function ($q, $rootScope) {
    return {
      /**
       * Returns a promise, with either the logged in user or returns an empty object.
       * @return {promise} Returns a promise.
       */
      getCurrentUser: function() {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              if($rootScope.DB.User.me) {
                resolve($rootScope.DB.User.me);
              } else {
                reject({});
              }
            });
        });
      },
      /**
       * registers a new User in baqend
       * @param {object} an baqend Event Object
       * @param {string} password
       * @return {promise} Returns the new User object or an empty Object.
       */
      register: function(newUser, password) {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              $rootScope.DB.User.register(newUser, password)
                .then(
                  function() {
                    resolve($rootScope.DB.User.me);
                  },
                  function() {
                    reject({});
                  }
                );
            });
        });
      },
      /**
       * log in a User in baqend
       * @param {object} an baqend Event Object
       * @param {string} password
       * @return {promise} Returns the User object or an empty Object.
       */
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
      /**
       * current user logout from baqend
       * @return {promise}
       */
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
