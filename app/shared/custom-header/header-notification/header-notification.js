'use strict';

/**
 * @ngdoc directive
 * @name mtiba.directive:headerNotification
 * @description
 * # headerNotification
 */
angular.module('mtiba')
	.directive('headerNotification',function(){
		return {
        templateUrl:'app/components/doctors/dashboard/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


