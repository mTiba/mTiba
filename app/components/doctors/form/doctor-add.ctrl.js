angular.module('mtiba.doctors')

	.controller('DoctorCreateController', function($scope, $http, $state, doctorMetadataFactory, doctorFormStepsFactory, Upload, $timeout, ngDialog, $stateParams, Doctor) {

	  var formCtrl = this;

	  formCtrl.uiRouterState = $state;

	  formCtrl.doctor = new Doctor();

	  formCtrl.metadata = doctorMetadataFactory.getData();

	  formCtrl.doctor.health = {};
	    
	  formCtrl.doctor.health.hospitalized_data= [
	      {  year: '', reason: '' },
	      {  year: '', reason: '' },
	      {  year: '', reason: '' }
	  ];

	  // formCtrl.pictureFile = {};
	  formCtrl.addDoctor = function() { //create a new doctor. Issues a POST to /api/doctors
	    formCtrl.doctor.$save(function() {
	      $state.go('doctorLogin'); // on success go back to home i.e. doctors state.
	    });
	  };

	  formCtrl.openTermsConditions = function (){
	    $scope.value = true;
	    ngDialog.open({
	      template: 'partials/_terms_and_conditions.html',
	      className: 'ngdialog-theme-plain',
	      scope: $scope,
	      cache: false
	    });
	  };
	})
