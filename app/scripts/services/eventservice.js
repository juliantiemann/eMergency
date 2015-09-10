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
    var _this = this;
    this.eventTypes = {};
    /**
     * Return the last events
     * @return {array} The last events
     */
    this.load = function(timestamp, resultsPerPage){
      var deferred = $q.defer();
      $db.Event.find()
        .lessThan('date', new Date(timestamp))
        .descending('date')
        .limit(resultsPerPage)
        .resultList()
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
                deferred.resolve(response);
              });
            },
            function(response) {
              deferred.reject(response);
            }
          );
      return deferred.promise;
    };
    /**
     * Adds a new event.
     * @param {object} an baqend Event Object
     * @return {object} Returns the just added Baqend Object.
     */
    this.add = function(newEvent) {
      newEvent.date = new Date();
      newEvent.type = this.eventTypes["unfall"];
      return $q(function(resolve, reject) {
        $db.Event(newEvent).insert(
          function(success){
            resolve(success);
          },
          function(error) {
            reject(error);
          });
      });
    };
    /**
     * updates an existing event.
     * @param {object} an baqend Event Object
     * @return {object} Returns the updated Baqend Object.
     */
    this.update = function(event) {
      return $q(function(resolve, reject) {
        event.save(
          function(success){
            resolve(success);
          },
          function(error) {
            reject(error);
          });
      });
    };
    /**
     * Subscribes to an Baqend event stream
     * @param {callback} function that is called, when a new object is added to the stream
     */
    this.subscribe = function(callback) {
      var handler = $rootScope.$on('notifying-service-event', callback);
      $db.ready()
        .then(function() {
          var stream = $db.Event.find().stream(false);
          stream.on("all", function(e) {
            var event = e.data;
            if(event.type !== null) {
              event.type.load().then(function(type) {
                event.type = type;
                $rootScope.$emit('notifying-service-event', event);
                $rootScope.$apply();
              });
            }
          });
        });
    };

    this.getEventtypes = function() {
      $db.Eventtype.find().resultList()
        .then(function(types) {
          angular.forEach(types, function(type) {
            _this.eventTypes[type.bezeichnung] = type;
          });
        });
    }

    $db.ready()
      .then(function() {
        _this.getEventtypes();
      });

  });
