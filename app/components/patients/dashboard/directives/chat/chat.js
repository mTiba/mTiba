'use strict';

/**
 * @ngdoc directive
 * @name 
 * @description
 * # adminPosHeader
 */
angular.module('yapili.patients.dashboard')
	.directive('patientChat',function(){

/*		var chatController = ['$scope', function ($scope) {
			//todo
		}];*/

		return {
        templateUrl:'app/components/patients/dashboard/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
       // controller: chatController,
		   // controllerAs: 'chatCtrl',
  	}

	});


