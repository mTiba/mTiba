'use strict';

/**
 * @ngdoc directive
 * @name yapili.directive:customHeader
 * @description
 * # customHeader
 */
angular.module('yapili')
	.directive('customHeader',function(){
		return {
        templateUrl:'app/shared/custom-header/custom-header.html',
        restrict: 'E',
        replace: true,
				scope: { user: '=' }
    	}
	});


