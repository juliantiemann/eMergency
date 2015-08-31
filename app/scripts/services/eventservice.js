'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.eventService
 * @description
 * # eventService
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('eventService', function ($q, $rootScope) {
    return {
      all: function() {
        return $q(function(resolve, reject) {
          $rootScope.DB.ready()
            .then(function() {
              $rootScope.DB.Todo.find().resultList()
                .then(function(response) {
                  resolve(response);
                }, function(response) {
                  reject(response);
                })
            });
        });
      },
      subscribe: function(callback) {
        var handler = $rootScope.$on('notifying-service-event', callback);
        $rootScope.DB.ready()
          .then(function() {
            var stream = $rootScope.DB.Todo.find().stream(false);
            stream.on("all", function(e) {
              $rootScope.$emit('notifying-service-event', e.data);
              $rootScope.$apply();
            });
          });
      }
    };
  });
