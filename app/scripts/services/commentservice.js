'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.commentService
 * @description
 * # commentService
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('commentService', function ($rootScope, $q, $db, userService) {
    /**
     * Get all Comments for one event
     */
    this.load = function(event){
      var deferred = $q.defer();
      $db.Comment.find()
        .equal('event', event)
        .resultList()
          .then(
            function(response) {
              deferred.resolve(response);
            },
            function(response) {
              deferred.reject(response);
            }
          );
      return deferred.promise;
    };
    /**
     * Adds a new comment.
     * @param {object} an baqend Event Object
     * @return {object} Returns the just added Baqend Object.
     */
    this.add = function(comment, event) {
      comment.date = new Date();
      comment.user = userService.user;
      return $q(function(resolve, reject) {
        $db.Comment(comment).insert(
          function(success){
            resolve(success);
          },
          function(error) {
            reject(error);
          });
      });
    };
    /**
     * updates an existing comment.
     * @param {object} an baqend Event Object
     * @return {object} Returns the updated Baqend Object.
     */
    this.update = function(comment) {
      return $q(function(resolve, reject) {
        comment.save({force:true})
          .then(
            function(success){
              resolve(success);
            },
            function(error) {
              reject(error);
            }
          );
      });
    };
    /**
     * Subscribes to an Baqend event stream
     * @param {callback} function that is called, when a new object is added to the stream
     */
    this.subscribe = function(event, callback) {
      var handler = $rootScope.$on('new-comment', callback);
      var stream = $db.Comment.find().equal('event', event).stream(false);
      stream.on("all", function(e) {
        var comment = e.data;
        $rootScope.$emit('new-comment', comment);
        $rootScope.$apply();
      });
    };

    this.loadUser = function(comment) {
      var deferred = $q.defer();
      if(comment.user.id == userService.user.id) {
        comment.user = userService.user;
        deferred.resolve(comment);
      } else {
        comment.user.load()
          .then(function(user) {
            comment.user = user;
            deferred.resolve(comment);
          }, function() {
            deferred.reject(comment);
          });
      }
      return deferred.promise;
    }
  });
