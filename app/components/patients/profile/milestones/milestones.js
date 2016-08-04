'use strict';

/**
 * @ngdoc directive
 * @name
 * @description
 * # milestones
 */
angular.module('yapili.patients')
	.directive('milestones',function() {
    return {
        templateUrl:'app/components/patients/profile/milestones/milestones.html',
        restrict: 'E',
        replace: true,
        scope: { milestones: '=' }
    }
  });
