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
  
  $stateProvider
      .state('login', { // login window 
        url: '/login',
        templateUrl: 'app/components/login/login.view.html'
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
      }).state('loginPatient', {
          url: '/patients/login',
          templateUrl:'app/components/patients/authentication/login/login.view.html',
          controller:'PatientLoginController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.authentication',
                    files:[
                      'app/components/patients/authentication/login/login.ctrl.js'
                    ]
                })
            }
          } 
      }).state('registerPatient', {
          url: '/patients/register',
          templateUrl:'app/components/patients/authentication/register/register.view.html',
          controller:'PatientRegisterController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.authentication',
                    files:[
                      'app/components/patients/authentication/register/register.ctrl.js'
                    ]
                })
            }
          } 
      }).state('patientsUsers', {
          url: '/patients/users',
          templateUrl:'app/components/patients/authentication/users/users.view.html',
          controller:'PatientUsersController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.authentication',
                    files:[
                      'app/components/patients/authentication/users/users.ctrl.js'
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
                      'app/components/patients/profile/milestones/milestones.js',
                      'app/components/patients/profile/milestone-add/milestone-add.js'
                    ]
                })
            }
          }  
      }).state('newPatient', { //state for updating a patient
          url: '/patients/add',
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
                    name:'mtiba.patients',
                    files:[
                      'app/components/patients/form/avatar-selector/avatar-selector.ctrl.js'
                    ]
                })
            }
          } 
      }).state('patientDashboard', {
        url:'/patients/:id/dashboard',
        templateUrl: 'app/components/patients/dashboard/dashboard.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.patients.dashboard',
                    files:[
                    'app/components/patients/dashboard/dashboard.js',
                    'app/components/patients/dashboard/dashboard.ctrl.js',
                    'app/components/patients/dashboard/directives/sidebar/sidebar.js',
                    'app/components/patients/dashboard/directives/sidebar/sidebar-search/sidebar-search.js',
                    'app/components/patients/dashboard/directives/timeline/timeline.js',
                    'app/components/patients/dashboard/directives/chat/chat.js',
                    'app/components/patients/profile/patient-view.ctrl.js',
                    'app/components/patients/profile/milestones/milestones.js',
                    'app/components/patients/authentication/users/users.ctrl.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
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
      }).state('patientDashboard.intro',{
        url:'/intro',
        templateUrl:'app/components/patients/dashboard/dashboard-intro.html'
      }).state('patientDashboard.home',{
        url:'/home',
        templateUrl:'app/components/patients/dashboard/dashboard-home.html'
      }).state('patientDashboard.profile',{
        url:'/profile',
        templateUrl:'app/components/patients/dashboard/dashboard-profile.html',
        resolve: {
          loadMyDirectives:function($ocLazyLoad){
              return $ocLazyLoad.load(
              {
                  name:'mtiba.patients',
                  files:[
                    'app/components/patients/profile/patient-profile/patient-profile.js',
                    'app/components/patients/profile/milestones/milestones.js',
                    'app/components/patients/profile/milestone-add/milestone-add.js'

                  ]
              })
          }
        }  
      }).state('patientDashboard.form',{
        url:'/form',
        templateUrl:'app/components/patients/form/patient-edit.html',
        resolve: {
          loadMyDirectives:function($ocLazyLoad){
              return $ocLazyLoad.load(
              {
                  name:'mtiba.patients',
                  files:[
                    'app/components/patients/form/patient-edit.ctrl.js'
                  ]
              })
          }
        } 
      }).state('patientDashboard.form.basic', {
            url: '/basic',
            templateUrl: 'app/components/patients/form/partials/step1.html'
      }).state('patientDashboard.form.lifestyle', {
            url: '/lifestyle',
            templateUrl: 'app/components/patients/form/partials/step2.html'
      }).state('patientDashboard.form.health', {
          url: '/health',
          templateUrl: 'app/components/patients/form/partials/step3.html'
      }).state('patientDashboard.form.family', {
          url: '/family',
          templateUrl: 'app/components/patients/form/partials/step4.html'
      }).state('patientDashboard.form.submit', {
          url: '/submit',
          templateUrl: 'app/components/patients/form/partials/submit.html'
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
      }).state('loginDoctor', {
          url: '/doctors/login',
          templateUrl:'app/components/doctors/authentication/login/login.view.html',
          controller:'LoginController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.authentication',
                    files:[
                      'app/components/doctors/authentication/login/login.ctrl.js'
                    ]
                })
            }
          } 
      }).state('registerDoctor', {
          url: '/doctors/register',
          templateUrl:'app/components/doctors/authentication/register/register.view.html',
          controller:'DoctorRegisterController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.authentication',
                    files:[
                      'app/components/doctors/authentication/register/register.ctrl.js'
                    ]
                })
            }
          } 
      }).state('doctorsUsers', {
          url: '/doctors/users',
          templateUrl:'app/components/doctors/authentication/users/users.view.html',
          controller:'DoctorsUsersController',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.authentication',
                    files:[
                      'app/components/doctors/authentication/users/users.ctrl.js'
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
      }).state('newDoctor.basic', {
            url: '/basic',
            templateUrl: 'app/components/doctors/form/partials/step1.html'
      }).state('newDoctor.background', {
            url: '/background',
            templateUrl: 'app/components/doctors/form/partials/step2.html'
      }).state('newDoctor.commitment', {
          url: '/commitment',
          templateUrl: 'app/components/doctors/form/partials/step3.html'
      }).state('newDoctor.submit', {
          url: '/submit',
          templateUrl: 'app/components/doctors/form/partials/submit.html'
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
      }).state('editDoctor.basic', {
            url: '/basic',
            templateUrl: 'app/components/doctors/form/partials/step1.html'
      }).state('editDoctor.background', {
            url: '/background',
            templateUrl: 'app/components/doctors/form/partials/step2.html'
      }).state('editDoctor.commitment', {
          url: '/commitment',
          templateUrl: 'app/components/doctors/form/partials/step3.html'
      }).state('editDoctor.submit', {
          url: '/submit',
          templateUrl: 'app/components/doctors/form/partials/submit.html'
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
        url:'/doctors/:id/dashboard',
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
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
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
      });

  $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .iconSet("avatars", './assets/svg/avatars.svg',128);   
}]);

mtibaApp.run(['$state', '$rootScope', '$location', '$cookieStore', '$http', function($state, $rootScope, $location, $cookieStore, $http) {
  $state.go('login'); //make a transition to form state when app starts

  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/patients/login', '/patients/register', '/doctors/login', '/doctors/register']) === -1;
      //TODO: differentiate between patients and users - allow to access only the related pages (patients - patient pages, doctors - doctor pages)
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $state.go('login');
      }
  });
}]);

