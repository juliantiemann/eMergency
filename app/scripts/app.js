'use strict';

/**
 * @ngdoc overview
 * @name eMergencyApp
 * @description
 * # eMergencyApp
 *
 * Main module of the application.
 */
angular
  .module('eMergencyApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'geolocation',
    'LocalStorageModule',
    'angularMoment',
    'infinite-scroll',
    'scrollable-table',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider, localStorageServiceProvider, uiGmapGoogleMapApiProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          $db: function($db) {
            return $db.ready();
          }
        }
      })
      .when('/about/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/register/', {
        templateUrl: 'views/registration.html',
        controller: 'RegisterCtrl',
      })
      .when('/login/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/creation', {
        templateUrl: 'views/eventcreation.html',
      })
      .otherwise({
        redirectTo: '/'
      });

    localStorageServiceProvider
      .setPrefix('eMergencyApp')
      .setStorageType('localStorage')
      .setNotify(true, true)

    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });  
  })
  .run(function(amMoment) {
    amMoment.changeLocale('de');
  });
