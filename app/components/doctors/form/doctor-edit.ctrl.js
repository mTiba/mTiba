angular.module('mtiba.doctors')

	.controller('DoctorEditController', function($scope, $state, $stateParams, Doctor, doctorMetadataFactory, doctorFormStepsFactory) {

	  var formCtrl = this;
	  
	  formCtrl.uiRouterState = $state;

	  formCtrl.steps = doctorFormStepsFactory.getSteps();

	  formCtrl.metadata = doctorMetadataFactory.getData();


	  formCtrl.updateDoctor = function() { //Update the edited doctors. Issues a PUT to /api/doctors/:id
	    formCtrl.doctor.$update(function() {
	      $state.go('doctors'); // on success go back to home i.e. doctors state.
	    });
	  };

	  formCtrl.loadDoctor = function() { //Issues a GET request to /api/doctors/:id to get a doctor to update  
	    formCtrl.doctor = Doctor.get({ id: $stateParams.id }, function(d){
	      formCtrl.doctor.date_of_birth = new Date(d.date_of_birth);
	    });
	  };

	  formCtrl.loadDoctor(); // Load a doctor which can be edited on UI
	})