angular.module('mtiba.dashboard', []);

angular.module('mtiba.dashboard')

	.controller('DashboardController', function($scope, $state, $stateParams, Doctor, PatientsOfDoctor, DoctorPatientsData, doctorMetadataFactory, patientMetadataFactory) {

	  var dashboardCtrl = this;

	  $scope = this;

		// Log List Array
	//  dashboardCtrl.logs = [];

	  dashboardCtrl.doctor = Doctor.get({id: $stateParams.id}, function(p, getResponseHeaders){
	    //Call factory to get metadata and manipulate it there, accessing scope from there 
	    dashboardCtrl.metadata = doctorMetadataFactory.getDataAndMapNames(p, $scope);  
	  });

	  dashboardCtrl.patients = PatientsOfDoctor.query(function(p, getResponseHeaders){ //fetch all doctor's patients. Issues a GET to /api/doctor/:id/patients
	    dashboardCtrl.metadata = patientMetadataFactory.getDataAndMapNames(p, $scope);  
	   	dashboardCtrl.selectedPatient = p[0];
	  });

  	dashboardCtrl.doctorPatientsData = DoctorPatientsData.get({doctor_id: $stateParams.id}, function(dpd){

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


	});



