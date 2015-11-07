var mtibaPatients =  angular.module('mtibaPatients', [
  'ngAnimate', 
  'ui.router', 
  'checklist-model', 
  'ngResource',
  'ngFileUpload', 
  'ngMessages',
  'ngDialog',
  'ui.bootstrap',
  'ngMaterial',
  'mtibaPatients.controllers',
  'mtibaPatients.services',
  'multiStepForm'
  ]);

mtibaPatients.config(function($stateProvider, $mdIconProvider) {
  $stateProvider
        .state('patients', { // state for showing all patient
          url: '/patients',
          templateUrl: 'partials/patients.html',
          controller: 'PatientListController'
        }).state('viewPatient', { //state for showing single patient
          url: '/patients/:id/view',
          templateUrl: 'partials/patient-view.html',
          controller: 'PatientViewController'
        }).state('newPatient', { //state for adding a new patient
          url: '/patients/new',
          templateUrl: 'partials/patient-add.html',
        // controller: 'PatientCreateController'
        }).state('editPatient', { //state for updating a patient
          url: '/patients/:id/edit',
          templateUrl: 'partials/patient-edit.html',
        //  controller: 'PatientEditController'
        }).state('selectPatientAvatar', { //state for selecting a patient avatar
          url: '/patients/:id/avatar',
          templateUrl: 'partials/form/_avatar_selector.html',
         // controller: 'PatientAvatarController'
        }).state('termsAndConditions', { //state for selecting a patient avatar
          url: '/patients/terms',
          templateUrl: 'partials/form/terms_and_conditions.html',
         // controller: 'PatientAvatarController'
        });
  $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .iconSet("avatars", './assets/svg/avatars.svg',128); 

  
});
mtibaPatients.run(function($state) {
  $state.go('patients'); //make a transition to form state when app starts
});