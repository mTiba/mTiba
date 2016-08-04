angular.module('yapili.patients')

.config(function($stateProvider) {
  $stateProvider
    .state('newPatient', {
      url: '/patients/add',
      controller: 'PatientCreateController',
      templateUrl: 'app/components/patients/form/patient-add.html',
      deepStateRedirect: { default: { state: 'newPatient.basic' } }
    }).state('newPatient.basic', {
            url: '/basic',
            templateUrl: 'app/components/patients/form/partials/step1.html'
    }).state('newPatient.lifestyle', {
          url: '/lifestyle',
          templateUrl: 'app/components/patients/form/partials/step2.html'
    }).state('newPatient.health', {
        url: '/health',
        templateUrl: 'app/components/patients/form/partials/step3.html'
    }).state('newPatient.family', {
        url: '/family',
        templateUrl: 'app/components/patients/form/partials/step4.html'
    }).state('newPatient.submit', {
        url: '/submit',
        templateUrl: 'app/components/patients/form/partials/submit.html'
    }).state('patientAvatar', { //state for selecting a patient avatar
      url: '/patients/:id/avatar',
      templateUrl: 'app/components/patients/form/avatar-selector/avatar-selector.html',
      resolve: {
        loadMyDirectives:function($ocLazyLoad){
            return $ocLazyLoad.load(
            {
                name:'yapili.patients',
                files:[
                  'app/components/patients/form/avatar-selector/avatar-selector.ctrl.js'
                ]
            })
        }
      } 
    });
})
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
