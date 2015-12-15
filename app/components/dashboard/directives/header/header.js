'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('mtiba.dashboard')
	.directive('header',function(){
		return {
        templateUrl:'app/components/dashboard/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


