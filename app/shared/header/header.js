'use strict';

/**
 * @ngdoc directive
 * @name 
 * @description
 * # adminPosHeader
 */
angular.module('mtiba')
	.directive('header',function(){
		return {
        templateUrl:'app/shared/header/header.html',
        restrict: 'E',
        replace: true,
        scope: {
	      }
    	}
	});


