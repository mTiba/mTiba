'use strict';

/**
 * @ngdoc directive
 * @name yapili.directive:headerNotification
 * @description
 * # headerNotification
 */
angular.module('yapili')
	.directive('headerNotification',function(){
		return {
        templateUrl:'app/components/doctors/dashboard/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


