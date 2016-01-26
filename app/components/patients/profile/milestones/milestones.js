'use strict';

/**
 * @ngdoc directive
 * @name mtiba.dashboard.directive:milestones
 * @description
 * # milestones
 */
angular.module('mtiba.patients')
	.directive('milestones',function() {
    return {
        templateUrl:'app/components/patients/profile/milestones/milestones.html',
        restrict: 'E',
        replace: true,
    }
  });
