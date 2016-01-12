'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('mtiba')
	.directive('headerNotification',function(){
		return {
        templateUrl:'app/components/dashboard/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


