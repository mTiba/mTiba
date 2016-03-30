'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('mtiba.patients.dashboard')
	.directive('timeline',function() {
    return {
        templateUrl:'app/components/patients/dashboard/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
