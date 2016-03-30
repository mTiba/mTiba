angular.module('mtiba.patients')

  .controller('PatientCreateController', function($scope, $http, $state, patientMetadataFactory, addPatientFormStepsFactory, Upload, $timeout, ngDialog, $stateParams, Patient) {

    var formCtrl = this;

    formCtrl.uiRouterState = $state;

    formCtrl.patient = new Patient();

    formCtrl.steps = addPatientFormStepsFactory.getSteps();

    formCtrl.metadata = patientMetadataFactory.getData();

    formCtrl.patient.health = {};
    formCtrl.patient.health.hospitalized_data= [
        {  year: '', reason: '' },
        {  year: '', reason: '' },
        {  year: '', reason: '' }
    ];

    formCtrl.addPatient = function() { //create a new patient. Issues a POST to /api/patient
      formCtrl.patient.$save(function() {
        $state.go('patientDashboard.intro'); // on success go back to home i.e. patients state.
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
