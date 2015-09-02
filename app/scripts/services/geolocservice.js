'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.geoLocService
 * @description
 * # geoLocService
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('geoLocService', function (geolocation, $localStorage) {
    return{
      getLocation: function() {
        var timestamp = new Date();
        return geolocation.getLocation().then(function(data){
          $localStorage.$location = {
            lat:data.coords.latitude,
            long:data.coords.longitude,
            time: timestamp
          };
          debugger
          return $localStorage.$location;
        }, function(error){
          debugger
          if((timestamp - $localStorage.$location.time) < 900000){
            return $localStorage.$location;
          }
          else {
            return error;
          }
        });
      }
    }
  });
