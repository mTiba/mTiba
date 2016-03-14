'use strict';

/**
 * @ngdoc directive
 * @name mtiba.dashboard.directive:milestones
 * @description
 * # milestones
 */
angular.module('mtiba.patients')
	.directive('milestoneAdd',function() {
    return {
        templateUrl:'app/components/patients/profile/milestone-add/milestone-add.html',
        restrict: 'E',
        replace: true,
        scope: { milestones: '=' },
        controller:function($scope){

			    // Add a milestone to the patient milestone list
			    $scope.addMilestone = function () {
			      var date = new Date();
			      $scope.milestones.push({
			          date: date,
			          text: $scope.milestoneText
			      });
			      // Clear input fields after push
			      $scope.milestoneText = "";
			    };


        }
    }
  });