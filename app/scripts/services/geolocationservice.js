'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.geoLocService
 * @description
 * # geoLocService
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('geolocationService', function ($rootScope, geolocation, localStorageService, $http, $q) {
    var _this = this;
    var location = {}
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
    this.get = function() {
      this.getStorage();
      this.getBrowser();
    };
    this.update = function() {
      this.getBrowser();
    };
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
    this.getBrowser = function() {
      var timestamp = new Date();
      geolocation.getLocation()
        .then(
          function(data){
            location = {
              lat:data.coords.latitude,
              long:data.coords.longitude,
              time: timestamp,
              error:0
            };
            localStorageService.set('geoLoc', location);
            _this.location = location;
            $rootScope.$emit('new-location');
          },
          function(error){
            location = _this.getIp()
              .then(
                function(location) {
                  _this.location = location;
                  $rootScope.$emit('new-location');
                }
              );
          }
        );
    };
    /**
     * @ngdoc method
     * @name eMergencyApp.geoLocService.getStorage
     * @methodOf eMergencyApp.geoLocService
     * @returns {object} location information from Local Storage
     * with error code:
     * 0 = no error, possition accurate
     * 1 = eroor, no possition provided
     */
    this.getStorage = function() {
      if(localStorageService.get('geoLoc')) {
        location = localStorageService.get('geoLoc');
        _this.location = location;
        $rootScope.$emit('new-location');
      }
    };
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
    this.getIp = function() {
      $http.get('http://ipinfo.io/json')
        .then(function(response) {
          var loc = response.data.loc.split(',');
          var location = {
            lat: loc[0],
            long: loc[1],
            time: new Date(),
            error: 3
          }
          _this.location = location;
          $rootScope.$emit('new-location');
        });
    };

    this.get();
  });
