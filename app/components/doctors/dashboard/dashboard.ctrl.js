angular.module('yapili.doctors.dashboard')

	.controller('DoctorDashboardController', function($scope, $state, $timeout, $window, $stateParams, Doctor, PatientsOfDoctor, DoctorLogs, doctorMetadataFactory, patientMetadataFactory) {

	  var dashboardCtrl = this;

	  dashboardCtrl.doctor = Doctor.get({id: $stateParams.id}, function(p, getResponseHeaders){
	    //Call factory to get metadata and manipulate it there, accessing scope from there 
	    doctorMetadataFactory.getDataAndMapNames(p, dashboardCtrl);  
	  });

	  //fetch all doctor's patients. Issues a GET to /api/doctor/:id/patients
	  dashboardCtrl.patients = PatientsOfDoctor.query(function(p, getResponseHeaders){ 
	    patientMetadataFactory.getDataAndMapNames(p, dashboardCtrl);  
	   	dashboardCtrl.selectedPatient = p[0];
	  });

	  //fetch doctor's logs about all patients. Issues a GET to /api/doctor/:id/logs
	  // TODO: move this logic to a service
  	dashboardCtrl.doctorLogs = DoctorLogs.get({doctor_id: $stateParams.id}, function(dpd){
  		angular.forEach(dashboardCtrl.patients, function(patient) {
  			angular.forEach(dpd.patients, function(data) {
	  			if(patient.id === data.patient_id){
	  				patient.logs = data.logs; 
	  			//	return;
	  			}
				});	
  		});
  	});
	  
	  // Add a log to the patient log list
    dashboardCtrl.addLog = function () {
    	var date = new Date();
      dashboardCtrl.selectedPatient.logs.push({
          date: date,
          text: dashboardCtrl.logText
      });
      // Clear input fields after push
      dashboardCtrl.logText = "";
    };


    dashboardCtrl.windowWidth = $window.innerWidth;

    $window.onresize = function(event) {
      $timeout(function() {
        dashboardCtrl.windowWidth = $window.innerWidth;
      });
    };

	});
