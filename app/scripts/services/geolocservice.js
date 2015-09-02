'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.geoLocService
 * @description
 * # geoLocService
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('geoLocService', function (geolocation) {
    return{
      getLocation: function() {
        geolocation.getLocation().then(function(data){
          return {lat:data.coords.latitude, long:data.coords.longitude};
        }, function(error){
          return error;
        });
      }
    }
  });
