'use strict';

/**
 * @ngdoc directive
 * @name mtiba.directive:customHeader
 * @description
 * # customHeader
 */
angular.module('mtiba')
	.directive('customHeader',function(){
		return {
        templateUrl:'app/shared/custom-header/custom-header.html',
        restrict: 'E',
        replace: true,
				scope: { user: '=' }
    	}
	});


