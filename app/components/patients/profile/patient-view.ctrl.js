angular.module('mtiba.patients')

  .controller('PatientViewController', function($scope, $state, $stateParams, Patient, patientMetadataFactory, patientMilestonesFactory, $http, $state) {

   // var viewCtrl = $scope;
    var viewCtrl = this;

    $scope.$state = $state;

    viewCtrl.patient = Patient.get({id: $stateParams.id}, function(p, getResponseHeaders){
      //Call factory to get metadata and manipulate it there, accessing scope from there 
      viewCtrl.metadata = patientMetadataFactory.getDataAndMapNames(p, viewCtrl); 
    });


    viewCtrl.milestones = [];
    viewCtrl.milestoneData = patientMilestonesFactory.get({doctor_id: $stateParams.id}, function(pm){
      viewCtrl.milestones = pm.milestones;
    });

    // Add a milestone to the patient milestone list
    viewCtrl.addMilestone = function () {
      var date = new Date();
      viewCtrl.milestones.push({
          date: date,
          text: viewCtrl.milestoneText
      });
      // Clear input fields after push
      viewCtrl.milestoneText = "";
    };



    viewCtrl.openPictureUpload = function(){
      $state.go('patientAvatar');
    };
  });