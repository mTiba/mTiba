'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('mtiba.dashboard')
	.directive('timeline',function() {
    return {
        templateUrl:'app/components/dashboard/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
