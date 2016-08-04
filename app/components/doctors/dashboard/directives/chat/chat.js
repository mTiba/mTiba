'use strict';

/**
 * @ngdoc directive
 * @name 
 * @description
 * # 
 */
angular.module('yapili.doctors.dashboard')
	.directive('doctorChat',function(){

/*		var chatController = ['$scope', function ($scope) {
		}];*/

		return {
        templateUrl:'app/components/doctors/dashboard/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
/*        controller: chatController,
		    controllerAs: 'chatCtrl',*/
			//	template: '<div>{{chatCtrl.name}}</div>'
  	}

	});


