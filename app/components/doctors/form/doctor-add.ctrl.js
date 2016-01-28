angular.module('mtiba.doctors')

	.controller('DoctorCreateController', function($scope, $http, $state, doctorMetadataFactory, doctorFormStepsFactory, Upload, $timeout, ngDialog, $stateParams, Doctor) {

	  var formCtrl = this;

	  formCtrl.uiRouterState = $state;

	  formCtrl.doctor = new Doctor();

	  formCtrl.steps = doctorFormStepsFactory.getSteps();

	  formCtrl.metadata = doctorMetadataFactory.getData();

	  formCtrl.doctor.health = {};
	    
	  formCtrl.doctor.health.hospitalized_data= [
	      {  year: '', reason: '' },
	      {  year: '', reason: '' },
	      {  year: '', reason: '' }
	  ];



	  /*formCtrl.appendForm = function(){
	    //document.getElementsByTagName("form")[0].setAttribute("name", "doctorForm");
	    var newElement = '<form class="form-horizontal" role="form" name="doctorForm" ng-submit="formCtrl.addDoctor()" novalidate>';
	    var stepElement = document.getElementsByClassName("multi-step-body")[0];
	    stepElement.innerHTML = newElement + stepElement.innerHTML + '</form>'; ;
	  };
	  setTimeout(formCtrl.appendForm, 300);
	  */

	  // formCtrl.pictureFile = {};
	  formCtrl.addDoctor = function() { //create a new doctor. Issues a POST to /api/doctors
	    formCtrl.doctor.$save(function() {
	      $state.go('doctorLogin'); // on success go back to home i.e. doctors state.
	    });
	  };

	  formCtrl.openTermsConditions = function (){
	    $scope.value = true;
	    ngDialog.open({
	      template: 'form/_terms_and_conditions.html',
	      className: 'ngdialog-theme-plain',
	      scope: $scope,
	      cache: false
	    });
	  };
	})
