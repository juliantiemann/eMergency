'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.userService
 * @description
 * # userService
 * Service for user management in baqend in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('userService', function ($q, $db, $rootScope) {
    this.user = null;
    this.user = {};
    /**
     * Returns a promise, with either the logged in user or returns an empty object.
     * @return {promise} Returns a promise.
     */
    this.getCurrentUser = function() {
      self = this;
      $db.ready()
        .then(function() {
          if($db.User.me) {
            self.user = $db.User.me;
          } else {
            self.guest = true;
          }
          $rootScope.$apply();
        });
    };
    /**
     * registers a new User in baqend
     * @param {object} an baqend Event Object
     * @param {string} password
     * @return {promise} Returns the new User object or an empty Object.
     */
    this.register = function(newUser, password) {
      return $q(function(resolve, reject) {
        $db.User.register(newUser, password)
          .then(
            function() {
              resolve($db.User.me);
            },
            function() {
              reject({});
            }
          );
      });
    };
    /**
     * log in a User in baqend
     * @param {object} an baqend Event Object
     * @param {string} password
     * @return {promise} Returns the User object or an empty Object.
     */
    this.login = function(user, password) {
      return $q(function(resolve, reject) {
        $db.User.login(user, password)
          .then(
            function(success) {
              resolve(success);
            },
            function(error) {
              reject(error);
            }
          );
      });
    };
    /**
     * current user logout from baqend
     * @return {promise}
     */
    this.logout = function() {
      return $q(function(resolve, reject) {
        $db.User.logout()
          .then(
            function(success) {
              resolve(success);
            },
            function(error) {
              reject(error);
            }
          );
      });
    };
    this.getCurrentUser();
  });
