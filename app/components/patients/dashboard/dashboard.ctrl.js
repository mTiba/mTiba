angular.module('mtiba.patients.dashboard')

	.controller('PatientDashboardController', function($scope, $state, $stateParams, Patient, patientMetadataFactory, patientsDoctorFactory, patientMilestonesFactory) {

	  var dashboardCtrl = this;

	  dashboardCtrl.patient = Patient.get({id: $stateParams.id}, function(p, getResponseHeaders){
	    //Call factory to get metadata and manipulate it there, accessing scope from there 
	    patientMetadataFactory.getDataAndMapNames(p, dashboardCtrl);  
	  });

		patientsDoctorFactory.get({patient_id: $stateParams.id}, function(pd){
      dashboardCtrl.doctor = pd.doctor;
    });

	  dashboardCtrl.milestones = [];
    dashboardCtrl.milestoneData = patientMilestonesFactory.get({patient_id: $stateParams.id}, function(pm){
      dashboardCtrl.milestones = pm.milestones;
    });

    dashboardCtrl.openPictureUpload = function(){
      $state.go('patientAvatar');
    };

	});
