angular.module('mtiba.patients')

  .controller('PatientCreateController', function($scope, $http, $state, patientMetadataFactory, patientFormStepsFactory, Upload, $timeout, ngDialog, $stateParams, Patient) {

    var formCtrl = this;

    formCtrl.uiRouterState = $state;

    formCtrl.patient = new Patient();

    formCtrl.steps = patientFormStepsFactory.getSteps();

    formCtrl.metadata = patientMetadataFactory.getData();

    formCtrl.patient.health = {};
    formCtrl.patient.health.hospitalized_data= [
        {  year: '', reason: '' },
        {  year: '', reason: '' },
        {  year: '', reason: '' }
    ];

      // formCtrl.pictureFile = {};

    formCtrl.addPatient = function() { //create a new patient. Issues a POST to /api/patien
      formCtrl.patient.$save(function() {
        $state.go('patients'); // on success go back to home i.e. patients state.
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
