'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('yapili.patients.dashboard')
  .directive('patientSidebar',['$location',function() {
    return {
      templateUrl:'app/components/patients/dashboard/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {  },
      //TODO: controller name
      controller:function($scope){

        $scope.selectedMenu = 'patientDashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);
