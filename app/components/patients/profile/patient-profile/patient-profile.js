'use strict';

/**
 * @ngdoc directive
 * @name mtiba.dashboard.directive:patientProfile
 * @description
 * # patientProfile
 */
angular.module('mtiba.patients')
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
