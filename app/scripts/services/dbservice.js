'use strict';
var dbconnected = false;
/**
 * @ngdoc service
 * @name eMergencyApp.db
 * @description
 * # db
 * Service in the eMergencyApp.
 */
angular.module('eMergencyApp')
  .service('$db', function () {
    if(!dbconnected) {
      DB.connect("https://julian.baqend.com");
      dbconnected = true;
    }
    return DB;
  });
