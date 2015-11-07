
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var mtibaDoctors = angular.module('mtibaDoctors', [
  'ngAnimate', 
  'ui.router', 
  'checklist-model', 
  'ngResource',
  'ngFileUpload', 
  'ngMessages',
  'ngDialog',
  'ui.bootstrap',
  'ngMaterial',
  'ui.select', 
  'ngSanitize',
  'mtibaDoctors.controllers',
  'mtibaDoctors.services',
  'multiStepForm'
  ]);

mtibaDoctors.config(function($stateProvider, $mdIconProvider) {
  $stateProvider
        .state('doctors', { // state for showing all doctor
          url: '/doctors',
          templateUrl: 'partials/doctors.html',
        //  controller: 'DoctorListController'
        }).state('viewDoctor', { //state for showing single doctor
          url: '/doctors/:id/view',
          templateUrl: 'partials/doctor-view.html',
          controller: 'DoctorViewController'
        }).state('newDoctor', { //state for adding a new doctor
          url: '/doctors/new',
          templateUrl: 'partials/doctor-add.html',
        // controller: 'DoctorCreateController'
        }).state('editDoctor', { //state for updating a doctor
          url: '/doctors/:id/edit',
          templateUrl: 'partials/doctor-edit.html',
        //  controller: 'DoctorEditController'
        }).state('selectDoctorAvatar', { //state for selecting a doctor avatar
          url: '/doctors/:id/avatar',
          templateUrl: 'partials/form/_avatar_selector.html',
         // controller: 'DoctorAvatarController'
        }).state('termsAndConditions', { //state for selecting a doctor avatar
          url: '/doctors/terms',
          templateUrl: 'partials/form/terms_and_conditions.html',
         // controller: 'DoctorAvatarController'
        });
  $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .iconSet("avatars", './assets/svg/avatars.svg',128); 
});
mtibaDoctors.run(function($state) {
  $state.go('doctors'); //make a transition to form state when app starts
});