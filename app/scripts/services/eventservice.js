'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.eventService
 * @description
 * # eventService with baqend
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('eventService', function ($q, $rootScope) {
    return {
      /**
       * Return the last events
       * @return {array} The last events
       */
      all: function() {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              $rootScope.DB.Event.find().resultList()
                .then(
                  function(response) {
                    resolve(response);
                  },
                  function(response) {
                    reject(response);
                  }
                )
            });
        });
      },
      /**
       * Adds a new event.
       * @param {object} an baqend Event Object
       * @return {object} Returns the just added Baqend Object.
       */
      add: function(newEvent) {
        newEvent.date = new Date();
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              $rootScope.DB.Event(newEvent).insert(
                function(success){
                  resolve(success);
                },
                function(error) {
                  reject(error);
                });
            });
        });
      },
      /**
       * updates an existing event.
       * @param {object} an baqend Event Object
       * @return {object} Returns the updated Baqend Object.
       */
      update: function(event) {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              event.save(
                function(success){
                  resolve(success);
                },
                function(error) {
                  reject(error);
                });
            });
        });
      },
      /**
       * Subscribes to an Baqend event stream
       * @param {callback} function that is called, when a new object is added to the stream
       */
      subscribe: function(callback) {
        var handler = $rootScope.$on('notifying-service-event', callback);
        $rootScope.DB.ready()
          .then(function() {
            var stream = $rootScope.DB.Event.find().stream(false);
            stream.on("all", function(e) {
              $rootScope.$emit('notifying-service-event', e.data);
              $rootScope.$apply();
            });
          });
      }
    };
  });
