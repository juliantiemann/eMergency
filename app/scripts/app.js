'use strict';
delete Array.prototype.initialize;

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
    'uiGmapgoogle-maps',
    'validation.match'
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
      .when('/event/:id', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl',
        resolve: {
          $db: function($db) {
            return $db.ready();
          }
        }
      })
      .when('/profile/', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    localStorageServiceProvider
      .setPrefix('eMergencyApp')
      .setStorageType('localStorage')
      .setNotify(true, true)

    uiGmapGoogleMapApiProvider.configure({
      libraries: 'weather'
    });
  })
  .run(function(amMoment) {
    amMoment.changeLocale('de');
  });
