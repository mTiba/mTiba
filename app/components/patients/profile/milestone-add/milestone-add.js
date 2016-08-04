'use strict';

/**
 * @ngdoc directive
 * @name 
 * @description
 * # milestones
 */
angular.module('yapili.patients')
	.directive('milestoneAdd',function() {
    return {
        templateUrl:'app/components/patients/profile/milestone-add/milestone-add.html',
        restrict: 'E',
        replace: true,
        scope: { milestones: '=' },
        controller:function($scope, $rootScope){

			    // Add a milestone to the patient milestone list
			    $scope.addMilestone = function () {
			      var date = new Date();
			      $scope.milestones.push({
			          date: date,
			          text: $scope.milestoneText,
			          //TODO: should be family(second)name and not username
			          doctor_name: $rootScope.globals.currentUser.username
			      });
			      // Clear input fields after push
			      $scope.milestoneText = "";
			    };

        }
    }
  });
