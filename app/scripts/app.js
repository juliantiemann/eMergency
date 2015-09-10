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
    'scrollable-table'
  ])
  .config(function ($routeProvider, localStorageServiceProvider) {
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/register', {
        templateUrl: 'views/registration.html',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
      })
      .otherwise({
        redirectTo: '/'
      });

    localStorageServiceProvider
      .setPrefix('eMergencyApp')
      .setStorageType('localStorage')
      .setNotify(true, true)
  })
  .run(function(amMoment) {
    amMoment.changeLocale('de');
  });
