angular.module('mtiba.patients')

.config(function($stateProvider) {
  $stateProvider
    .state('viewPatient', {
      url: '/patients/:id/view',
      controller: 'PatientViewController',
      templateUrl: 'app/components/patients/profile/patient-view.html',
        resolve: {
          loadMyDirectives:function($ocLazyLoad){
              return $ocLazyLoad.load(
              {
                  name:'mtiba.patients',
                  files:[
                    'app/components/patients/profile/milestones/milestones.js',
                    'app/components/patients/profile/milestone-add/milestone-add.js'
                  ]
              })
          }
        }  
    });
})
.controller('PatientViewController', function($scope, $rootScope, $http, $state, $stateParams, Patient, patientMetadataFactory, patientMilestonesFactory) {
 // var viewCtrl = $scope;
  var viewCtrl = this;
  $scope.$state = $state;

  viewCtrl.patient = Patient.get({id: $stateParams.id}, function(p, getResponseHeaders){
    //Call factory to get metadata and manipulate it there, accessing scope from there 
    viewCtrl.metadata = patientMetadataFactory.getDataAndMapNames(p, viewCtrl); 
  });
  viewCtrl.milestones = [];
  viewCtrl.milestoneData = patientMilestonesFactory.get({patient_id: $stateParams.id}, function(pm){
    viewCtrl.milestones = pm.milestones;
  });
  viewCtrl.openPictureUpload = function(){
    $state.go('patientAvatar');
  };
});
