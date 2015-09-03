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
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
    localStorageServiceProvider
      .setPrefix('myApp')
      .setStorageType('sessionStorage')
      .setNotify(true, true)
  })
  .run(function($rootScope) {
    $rootScope.DB = new DB.EntityManagerFactory("https://julian.baqend.com");
    $rootScope.DB = $rootScope.DB.createEntityManager();
  });
