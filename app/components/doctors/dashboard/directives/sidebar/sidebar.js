'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('yapili.doctors.dashboard')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'app/components/doctors/dashboard/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: { patients: '=', selectedPatient: '=' },
      controller:function($scope, $state){

        $scope.selectedMenu = 'doctorDashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        $scope.uiRouterState = $state;

        $scope.setPatient = function(patient){
          $state.go('doctorDashboard.home');
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
