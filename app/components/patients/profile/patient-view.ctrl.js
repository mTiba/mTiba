angular.module('mtiba.patients')

  .controller('PatientViewController', function($scope, $http, $state, $stateParams, Patient, patientMetadataFactory, patientMilestonesFactory) {

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