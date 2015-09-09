'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.eventService
 * @description
 * # eventService with baqend
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('eventService', function ($rootScope, $q, $db) {
    return {
      /**
       * Return the last events
       * @return {array} The last events
       */
      all: function() {
        return $q(function(resolve, reject) {
          $db.ready()
            .then(function() {
              $db.Event.find().resultList()
                .then(
                  function(response) {
                     var typesLoaded = [];
                     angular.forEach(response, function(event, k) {
                       if(event.type !== null) {
                         typesLoaded.push(event.type.load().then(function(type) {
                           event.type = type;
                         }));
                       }
                     });
                     $q.all(typesLoaded).then(function() {
                       resolve(response);
                     });
                  },
                  function(response) {
                    reject(response);
                  }
                );
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
          $db.Event(newEvent).insert(
            function(success){
              resolve(success);
            },
            function(error) {
              reject(error);
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
          event.save(
            function(success){
              resolve(success);
            },
            function(error) {
              reject(error);
            });
        });
      },
      /**
       * Subscribes to an Baqend event stream
       * @param {callback} function that is called, when a new object is added to the stream
       */
      subscribe: function(callback) {
        var handler = $rootScope.$on('notifying-service-event', callback);
        $db.ready()
          .then(function() {
            var stream = $db.Event.find().stream(false);
            stream.on("all", function(e) {
              $rootScope.$emit('notifying-service-event', e.data);
              $rootScope.$apply();
            });
          });
      }
    };
  });
