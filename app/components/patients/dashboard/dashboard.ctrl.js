angular.module('mtiba.patients.dashboard')

	.controller('DashboardController', function($scope, $state, $stateParams, Patient, patientMetadataFactory, patientMilestonesFactory) {

	  var dashboardCtrl = this;

	  dashboardCtrl.patient = Patient.get({id: $stateParams.id}, function(p, getResponseHeaders){
	    //Call factory to get metadata and manipulate it there, accessing scope from there 
	    patientMetadataFactory.getDataAndMapNames(p, dashboardCtrl);  
	  });

	  dashboardCtrl.milestones = [];
    dashboardCtrl.milestoneData = patientMilestonesFactory.get({patient_id: $stateParams.id}, function(pm){
      dashboardCtrl.milestones = pm.milestones;
     // console.log(dashboardCtrl.milestones);
    });

    dashboardCtrl.openPictureUpload = function(){
      $state.go('patientAvatar');
    };

	});
