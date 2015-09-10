'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.geoLocService
 * @description
 * # geoLocService
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('geoLocService', function ($rootScope, geolocation, localStorageService, $http, $q) {
    return{
      /**
     * @ngdoc method
     * @name eMergencyApp.geoLocService.get
     * @methodOf eMergencyApp.geoLocService
     * @returns {object} location information
     * with error code:
     * 0 = no error, possition accurate
     * 1 = eroor, no possition provided
     * 2 = error, position outdatesd
     * 3 = error, position not accurate
     */
      get: function() {
        return this.getBrowser();
      },
      /**
     * @ngdoc method
     * @name eMergencyApp.geoLocService.getBrowser
     * @methodOf eMergencyApp.geoLocService
     * @returns {object} location information from Geolocation API
     * with error code:
     * 0 = no error, possition accurate
     * 1 = eroor, no possition provided
     * 2 = error, position outdatesd
     * 3 = error, position not accurate
     */
      getBrowser: function() {
        var self = this;
        var deferred = $q.defer();
        var timestamp = new Date();
        var location = self.getStorage();
        var time = new Date(location.time);
        if ((timestamp - time) > 900000 ){
          location.error = 2;
        }
        geolocation.getLocation()
          .then(
            function(data){
              console.log("got location");
              location = {
                lat:data.coords.latitude,
                long:data.coords.longitude,
                time: timestamp,
                error:0
              };
              localStorageService.set('geoLoc', location);
              deferred.resolve(location);
            },
            function(error){
              location = self.getIp()
                .then(
                  function(location) {
                    deferred.resolve(location);
                  },
                  function(error) {
                    deferred.reject(error);
                  }
                );
            }
          );
        return deferred.promise;
      },
      /**
     * @ngdoc method
     * @name eMergencyApp.geoLocService.getStorage
     * @methodOf eMergencyApp.geoLocService
     * @returns {object} location information from Local Storage
     * with error code:
     * 0 = no error, possition accurate
     * 1 = eroor, no possition provided
     */
      getStorage: function() {
        var timestamp = new Date('01/12/1984');
        var location = {};
        return $q(function(resolve, reject) {
          if(localStorageService.get('geoLoc')) {
            location = localStorageService.get('geoLoc');
            resolve(location);
          }
          else {
            location = {
              lat:0,
              long:0,
              time:timestamp,
              error:1
            };
            reject(location);
          }
        });
      },
      /**
     * @ngdoc method
     * @name eMergencyApp.geoLocService.getIp
     * @methodOf eMergencyApp.geoLocService
     * @returns {object} location information from IP ()
     * with error code:
     * 0 = no error, possition accurate
     * 1 = eroor, no possition provided
     * 2 = error, position outdatesd
     * 3 = error, position not accurate
     */
      getIp: function() {
        var timestamp = new Date();
        var location = {};
        return $http.get('http://ipinfo.io/json')
        .then(function(response) {
          var loc = response.data.loc.split(',');
          location = {
            lat:loc[0],
            long:loc[1],
            time:timestamp,
            error:3
          }
          return location;
        }, function(error) {
          location = {
            lat:0,
            long:0,
            time:timestamp,
            error:1
          };
          return location;
        });
      }
    }
  });
