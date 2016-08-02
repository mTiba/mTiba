var mtibaApp =  angular.module('mtiba', [
  'ngAnimate', 
  'ui.router', 
  'ct.ui.router.extras.dsr',// for deep state routing
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
  'vcRecaptcha',
  'mtiba.login',
  'mtiba.doctors',
  'mtiba.doctors.dashboard',
  'mtiba.patients',
  'mtiba.patients.dashboard'
  ]);

mtibaApp.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider', '$mdIconProvider', '$mdThemingProvider', 
        function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider, $mdIconProvider, $mdThemingProvider) {
   
/*  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark();*/

  $ocLazyLoadProvider.config({
    debug:false,
    events:true,
  });

  $urlRouterProvider.otherwise('/login');
  
  $stateProvider
      /*.state('doctors', { // state for showing all doctors
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
      })*/.state('viewDoctor', { //state for showing single doctor
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
      });

  $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .iconSet("avatars", './assets/svg/avatars.svg',128);  

  //reCAPTCHAProvider.setPublicKey('6Lf3QCQTAAAAAJdmVsA9Shi-wh2WFEVOnzviw5vX');

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
/*      if (restrictedPage && !loggedIn) {
        $state.go('login');
      }*/
  });
}]);

