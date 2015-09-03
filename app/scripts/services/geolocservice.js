'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.geoLocService
 * @description
 * # geoLocService
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('geoLocService', function (geolocation, localStorageService) {
    return{
      getLocation: function() {
        var timestamp = new Date();
        return geolocation.getLocation().then(function(data){
          var location = {
            lat:data.coords.latitude,
            long:data.coords.longitude,
            time: timestamp
          };
          localStorageService.set('geoLoc', location);
          return location;
        }, function(error){
          debugger
          var location = localStorageService.get('geoLoc');
          var time = new Date(location.time);
          if((timestamp - time) < 900000){
            debugger
            return location;
          }
          else {
            return error;
          }
        });
      }
    }
  });
