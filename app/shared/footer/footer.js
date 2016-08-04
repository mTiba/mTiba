'use strict';

/**
 * @ngdoc directive
 * @name yapili.directive:footer
 * @description
 * # footer
 */
angular.module('yapili')
.directive('footer', function () {
    return {
        restrict: 'E', //This menas that it will be used as an element
        replace: true,
        templateUrl: "app/shared/footer/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});
