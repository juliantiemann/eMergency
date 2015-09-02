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
    'geolocation'
  ])
  .config(function ($routeProvider) {
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
  })
  .run(function($rootScope) {
    $rootScope.DB = new DB.EntityManagerFactory("https://julian.baqend.com");
    $rootScope.DB = $rootScope.DB.createEntityManager();
  });
