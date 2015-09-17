'use strict';

/**
 * @ngdoc directive
 * @name eMergencyApp.directive:absRelTo
 * @description
 * # absRelTo
 */
angular.module('eMergencyApp')
  .directive('absRelTo', function ($rootScope, $timeout, $window) {
    return {
      restrict: 'AEC',
      link: function postLink(scope, element, attrs) {
        var update = function() {
          $timeout(function() {
            var $prev = element.prev(attrs.absRelTo);
            if($prev.length) {
              var offset = $prev.offset().top + $prev.outerHeight() + parseInt(attrs.margin);
              element.css("top", offset);
            } else {
              var offset = element.parent().offset().top + parseInt(attrs.margin);
              element.css("top", offset)
            }
          });
        }
        $rootScope.$on("userstate-change", function() {
          update();
        });
        angular.element($window).on("resize", function() {
          update();
        });
        update();
      }
    };
  });
