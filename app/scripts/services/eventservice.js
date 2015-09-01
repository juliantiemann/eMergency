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
      add: function(newEvent) {
        newEvent.date = new Date();
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              $rootScope.DB.Event(newEvent).save(
                function(success){
                  resolve(success);
                },
                function(error) {
                  reject(error);
                });
            });
        });
      },
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
