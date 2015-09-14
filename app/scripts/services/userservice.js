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
    var _this = this;
    this.guest = null;
    this.user = {};
    /**
     * Returns a promise, with either the logged in user or returns an empty object.
     * @return {promise} Returns a promise.
     */
    this.getCurrentUser = function() {
      if($db.User.me) {
        this.user = $db.User.me;
        this.guest = false;
      } else {
        this.user = {};
        this.guest = true;
      }
    };
    /**
     * registers a new User in baqend
     * @param {object} an baqend Event Object
     * @param {string} password
     * @return {promise} Returns the new User object or an empty Object.
     */
    this.register = function(newUser, password) {
      var deferred = $q.defer();
      //var newUser = new $db.User(newUser);
      $db.User.register(newUser, password)
        .then(
          function(success) {
            _this.getCurrentUser();
            deferred.resolve(success);
            $rootScope.$digest();
          },
          function(error) {
            _this.getCurrentUser();
            deferred.reject(error);
            $rootScope.$digest();
          }
        );
      return deferred.promise;
    };
    /**
     * log in a User in baqend
     * @param {object} an baqend Event Object
     * @param {string} password
     * @return {promise} Returns the User object or an empty Object.
     */
    this.login = function(user, password) {
      var deferred = $q.defer();
      $db.User.login(user, password)
        .then(
          function(success) {
            _this.getCurrentUser();
            deferred.resolve(success);
            $rootScope.$digest();
          },
          function(error) {
            _this.getCurrentUser();
            deferred.reject(error);
            $rootScope.$digest();
          }
        );
      return deferred.promise;
    };
    /**
     * current user logout from baqend
     * @return {promise}
     */
    this.logout = function() {
      var deferred = $q.defer();
      $db.User.logout()
        .then(
          function(success) {
            _this.getCurrentUser();
            deferred.resolve(success);
            $rootScope.$digest();
          },
          function(error) {
            _this.getCurrentUser();
            deferred.reject(error);
            $rootScope.$digest();
          }
        );
      return deferred.promise;
    };

    $db.ready(function() {
      _this.getCurrentUser();
      $rootScope.$apply();
    });
  });
