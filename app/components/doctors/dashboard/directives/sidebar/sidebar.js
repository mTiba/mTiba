'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('mtiba.doctors.dashboard')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'app/components/doctors/dashboard/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      //scope: {
      //},
      scope: { patients: '=', selectedPatient: '=' },
      controller:function($scope){

        $scope.selectedMenu = 'doctorDashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;

        $scope.setPatient = function(patient){
         $scope.selectedPatient = patient;         
        };
        
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
