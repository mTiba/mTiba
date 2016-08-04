'use strict';

/**
 * @ngdoc directive
 * @name yapili.directive:customHeader
 * @description
 * # customHeader
 */
angular.module('yapili')
	.directive('customHeaderNoUser',function(){
		return {
        templateUrl:'app/shared/custom-header/custom-header-no-user.html',
        restrict: 'E',
        replace: true
    	}
	});


