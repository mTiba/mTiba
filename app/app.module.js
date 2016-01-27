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
  'oc.lazyLoad',
  'angular-loading-bar',
  'ngCookies',

  'mtiba.authentication',
  'mtiba.patients',
  'mtiba.doctors'
  ]);

mtibaApp.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider', '$mdIconProvider', function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider, $mdIconProvider) {
   
  $ocLazyLoadProvider.config({
    debug:false,
    events:true,
  });

 $urlRouterProvider.otherwise('/login');

  //mtibaApp.config(function($stateProvider, $mdIconProvider) {
  $stateProvider
        .state('login', { // login window 
          url: '/login',
          templateUrl: 'app/components/login/login.view.html',
          controller: 'LoginController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.login',
                    files:[
                      'app/components/login/login.ctrl.js'
                    ]
                })
            }
          }  
      }).state('patients', { // state for showing all patients
          url: '/patients',
          templateUrl: 'app/components/patients/list/patients-list.html',
          controller: 'PatientListController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.patients',
                    files:[
                      'app/components/patients/list/patients-list.ctrl.js'
                    ]
                })
            }
          }  
      }).state('viewPatient', { //state for showing single patient
          url: '/patients/:id/view',
          templateUrl: 'app/components/patients/profile/patient-view.html',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.patients',
                    files:[
                      'app/components/patients/profile/patient-view.ctrl.js',
                      'app/components/patients/profile/milestones/milestones.js'
                    ]
                })
            }
          }  
      }).state('newPatient', { //state for adding a new patient
          url: '/patients/new',
          templateUrl: 'app/components/patients/form/patient-add.html',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.patients',
                    files:[
                      'app/components/patients/form/patient-add.ctrl.js',
                    ]
                })
            }
          }  
      }).state('editPatient', { //state for updating a patient
          url: '/patients/:id/edit',
          templateUrl: 'app/components/patients/form/patient-edit.html',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.patients',
                    files:[
                      'app/components/patients/form/patient-edit.ctrl.js',
                    ]
                })
            }
          } 
      }).state('patientAvatar', { //state for selecting a patient avatar
          url: '/patients/:id/avatar',
          templateUrl: 'app/components/patients/form/avatar-selector/avatar-selector.html',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.patients',
                    files:[
                      'app/components/patients/form/avatar-selector/avatar-selector.ctrl.js'
                    ]
                })
            }
          } 
      }).state('doctors', { // state for showing all doctors
          url: '/doctors',
          templateUrl: 'app/components/doctors/list/doctors-list.html',
          controller: 'DoctorListController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.doctors',
                    files:[
                      'app/components/doctors/list/doctors-list.ctrl.js'
                    ]
                })
            }
          } 
      }).state('viewDoctor', { //state for showing single doctor
          url: '/doctors/:id/view',
          templateUrl: 'app/components/doctors/profile/doctor-view.html',
          controller: 'DoctorViewController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.doctors',
                    files:[
                      'app/components/doctors/profile/doctor-view.ctrl.js'
                    ]
                })
            }
          }  
      }).state('newDoctor', { //state for adding a new doctor
          url: '/doctors/new',
          templateUrl: 'app/components/doctors/form/doctor-add.html',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.doctors',
                    files:[
                      'app/components/doctors/form/doctor-add.ctrl.js',
                    ]
                })
            }
          }
      }).state('editDoctor', { //state for updating a doctor
          url: '/doctors/:id/edit',
          templateUrl: 'app/components/doctors/form/doctor-edit.html',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.doctors',
                    files:[
                      'app/components/doctors/form/doctor-edit.ctrl.js',
                    ]
                })
            }
          }
      }).state('doctorAvatar', { //state for selecting a doctor avatar
          url: '/doctors/:id/avatar',
          templateUrl: 'app/components/doctors/form/avatar-selector/avatar-selector.html',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.doctors',
                    files:[
                      'app/components/doctors/form/avatar-selector/avatar-selector.ctrl.js'
                    ]
                })
            }
          } 
      }).state('termsAndConditions', { //state for selecting a doctor avatar
          url: '/doctors/terms',
          templateUrl: 'app/components/doctors/form/partials/_terms_and_conditions.html',
          // controller: 'DoctorAvatarController'
      }).state('doctorDashboard', {
        url:'/doctors/dashboard/:id',
        templateUrl: 'app/components/doctors/dashboard/dashboard.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.doctors.dashboard',
                    files:[
                    'app/components/doctors/dashboard/dashboard.js',
                    'app/components/doctors/dashboard/dashboard.ctrl.js',
                    'app/components/doctors/dashboard/directives/sidebar/sidebar.js',
                    'app/components/doctors/dashboard/directives/sidebar/sidebar-search/sidebar-search.js',
                    'app/components/doctors/dashboard/directives/timeline/timeline.js',
                    'app/components/doctors/dashboard/directives/chat/chat.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["../../bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "../../bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['../../bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
      }).state('doctorLogin', {
          url: '/doctors/login',
          templateUrl:'app/components/doctors/authentication/login/login.view.html',
          controller:'LoginController'
      }).state('doctorRegister', {
          url: '/doctors/register',
          templateUrl:'app/components/doctors/authentication/register/register.view.html',
          controller:'RegisterController'
      }).state('users', {
          url: '/doctors/users',
          templateUrl:'app/components/doctors/authentication/users/users.view.html',
          controller:'UsersController'
      });


  $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .iconSet("avatars", './assets/svg/avatars.svg',128); 

  
}]);
mtibaApp.run(function($state, $rootScope, $location, $cookieStore, $http) {
  $state.go('login'); //make a transition to form state when app starts

  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/patients/login', '/patients/register', '/patients/new', '/doctors/login', '/doctors/register', '/doctors/new']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $state.go('login');
      }
  });

});

