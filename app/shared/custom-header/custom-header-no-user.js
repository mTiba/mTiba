'use strict';

/**
 * @ngdoc directive
 * @name mtiba.directive:customHeader
 * @description
 * # customHeader
 */
angular.module('mtiba')
	.directive('customHeaderNoUser',function(){
		return {
        templateUrl:'app/shared/custom-header/custom-header-no-user.html',
        restrict: 'E',
        replace: true
    	}
	});


