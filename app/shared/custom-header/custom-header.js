'use strict';

/**
 * @ngdoc directive
 * @name 
 * @description
 * # adminPosHeader
 */
angular.module('mtiba')
	.directive('customHeader',function(){
		return {
        templateUrl:'app/shared/custom-header/custom-header.html',
        restrict: 'E',
        replace: true,
        scope: {
	      }
    	}
	});


