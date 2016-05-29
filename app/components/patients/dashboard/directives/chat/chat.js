'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('mtiba.patients.dashboard')
	.directive('patientChat',function(){

		var chatController = ['$scope', function ($scope) {
			//todo
		}];

		return {
        templateUrl:'app/components/patients/dashboard/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
        controller: chatController,
		    controllerAs: 'chatCtrl',
			//	template: '<div>{{chatCtrl.name}}</div>'
  	}

	});


