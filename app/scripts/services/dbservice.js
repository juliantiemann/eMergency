'use strict';

/**
 * @ngdoc service
 * @name eMergencyApp.db
 * @description
 * # db
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('$db', function () {
    DB.connect("https://julian.baqend.com");
    return DB;
  });
