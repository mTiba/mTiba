'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('mtiba.doctors.dashboard')
	.directive('timeline',function() {
    return {
        templateUrl:'app/components/doctors/dashboard/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
