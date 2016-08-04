'use strict';

/**
 * @ngdoc directive
 * @name
 * @description
 * # patientProfile
 */
angular.module('yapili.patients')
	.directive('patientProfile',function() {
    return {
        templateUrl:'app/components/patients/profile/patient-profile/patient-profile.html',
        restrict: 'E',
        replace: true,
        //scope: { milestones: '=' },
        controller:function($scope){

        }
    }
  });
