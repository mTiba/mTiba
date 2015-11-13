var mtibaApp =  angular.module('mtiba', [
  'ngAnimate', 
  'ui.router', 
  'checklist-model', 
  'ngResource',
  'ngFileUpload', 
  'ngMessages',
  'ngDialog',
  'ui.bootstrap',
  'ngMaterial',
  'multiStepForm',
  'ui.select',
  'ngSanitize',

  'mtibaControllers',
  'PatientServices',
  'DoctorServices',

//  'datePicker'
  ]);


mtibaApp.config(function($stateProvider, $mdIconProvider) {
  $stateProvider
        .state('patients', { // state for showing all patient
          url: '/patients',
          templateUrl: 'partials/patients/patients.html',
          controller: 'PatientListController',
        }).state('viewPatient', { //state for showing single patient
          url: '/patients/:id/view',
          templateUrl: 'partials/patients/patient-view.html',
          controller: 'PatientViewController'
        }).state('newPatient', { //state for adding a new patient
          url: '/patients/new',
          templateUrl: 'partials/patients/patient-add.html',
        // controller: 'PatientCreateController'
        }).state('editPatient', { //state for updating a patient
          url: '/patients/:id/edit',
          templateUrl: 'partials/patients/patient-edit.html',
        //  controller: 'PatientEditController'
        }).state('selectPatientAvatar', { //state for selecting a patient avatar
          url: '/patients/:id/avatar',
          templateUrl: 'partials/patients/form/_avatar_selector.html',
         // controller: 'PatientAvatarController'
        }).state('doctors', { // state for showing all doctor
          url: '/doctors',
          templateUrl: 'partials/doctors/doctors.html',
          //  controller: 'DoctorListController'
      }).state('viewDoctor', { //state for showing single doctor
          url: '/doctors/:id/view',
          templateUrl: 'partials/doctors/doctor-view.html',
          controller: 'DoctorViewController'
      }).state('newDoctor', { //state for adding a new doctor
          url: '/doctors/new',
          templateUrl: 'partials/doctors/doctor-add.html',
          // controller: 'DoctorCreateController'
      }).state('editDoctor', { //state for updating a doctor
          url: '/doctors/:id/edit',
          templateUrl: 'partials/doctors/doctor-edit.html',
          //  controller: 'DoctorEditController'
      }).state('selectDoctorAvatar', { //state for selecting a doctor avatar
          url: '/doctors/:id/avatar',
          templateUrl: 'partials/doctors/form/_avatar_selector.html',
          // controller: 'DoctorAvatarController'
      }).state('termsAndConditions', { //state for selecting a doctor avatar
          url: '/doctors/terms',
          templateUrl: 'partials/doctors/form/terms_and_conditions.html',
          // controller: 'DoctorAvatarController'
      }).state('login', {
          url: '/login',
          templateUrl:'partials/login/login.html',
          controller:'LoginController'
      });
  $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .iconSet("avatars", './assets/svg/avatars.svg',128); 

  
});
mtibaApp.run(function($state) {
  $state.go('login'); //make a transition to form state when app starts
});