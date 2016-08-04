'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('yapili.patients.dashboard')
	.directive('patientTimeline',function() {
    return {
        templateUrl:'app/components/patients/dashboard/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
