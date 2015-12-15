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

  'mtiba.login',
  'mtiba.patients',
  'mtiba.doctors'
  //'mtiba.dashboard'
//  'datePicker'
  ]);

mtibaApp.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider', '$mdIconProvider', function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider, $mdIconProvider) {
   
  $ocLazyLoadProvider.config({
    debug:false,
    events:true,
  });

 // $urlRouterProvider.otherwise('/dashboard/home');

//mtibaApp.config(function($stateProvider, $mdIconProvider) {
  $stateProvider
      .state('patients', { // state for showing all patient
          url: '/patients',
          templateUrl: 'app/components/patients/templates/patients.html',
          controller: 'PatientListController',
      }).state('viewPatient', { //state for showing single patient
          url: '/patients/:id/view',
          templateUrl: 'app/components/patients/templates/patient-view.html',
          controller: 'PatientViewController'
      }).state('newPatient', { //state for adding a new patient
          url: '/patients/new',
          templateUrl: 'app/components/patients/templates/patient-add.html',
      // controller: 'PatientCreateController'
      }).state('editPatient', { //state for updating a patient
          url: '/patients/:id/edit',
          templateUrl: 'app/components/patients/templates/patient-edit.html',
      //  controller: 'PatientEditController'
      }).state('selectPatientAvatar', { //state for selecting a patient avatar
          url: '/patients/:id/avatar',
          templateUrl: 'app/components/patients/templates/form/_avatar_selector.html',
         // controller: 'PatientAvatarController'
      }).state('doctors', { // state for showing all doctor
          url: '/doctors',
          templateUrl: 'app/components/doctors/templates/doctors.html',
          //  controller: 'DoctorListController'
      }).state('viewDoctor', { //state for showing single doctor
          url: '/doctors/:id/view',
          templateUrl: 'app/components/doctors/templates/doctor-view.html',
          controller: 'DoctorViewController'
      }).state('newDoctor', { //state for adding a new doctor
          url: '/doctors/new',
          templateUrl: 'app/components/doctors/templates/doctor-add.html',
          // controller: 'DoctorCreateController'
      }).state('editDoctor', { //state for updating a doctor
          url: '/doctors/:id/edit',
          templateUrl: 'app/components/doctors/templates/doctor-edit.html',
          //  controller: 'DoctorEditController'
      }).state('selectDoctorAvatar', { //state for selecting a doctor avatar
          url: '/doctors/:id/avatar',
          templateUrl: 'app/components/doctors/templates/form/_avatar_selector.html',
          // controller: 'DoctorAvatarController'
      }).state('termsAndConditions', { //state for selecting a doctor avatar
          url: '/doctors/terms',
          templateUrl: 'app/components/doctors/templates/form/terms_and_conditions.html',
          // controller: 'DoctorAvatarController'
      }).state('login', {
          url: '/login',
          templateUrl:'app/components/login/login.html',
          controller:'LoginController'
      }).state('dashboard', {
        url:'/dashboard/:id',
        templateUrl: 'app/components/dashboard/views/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.dashboard',
                    files:[
                    'app/components/dashboard/dashboard.js',
                    'app/components/dashboard/directives/sidebar/sidebar.js',
                    'app/components/dashboard/directives/sidebar/sidebar-search/sidebar-search.js',
                    'app/components/dashboard/directives/header/header.js',
                    'app/components/dashboard/directives/timeline/timeline.js',
                    'app/components/dashboard/directives/chat/chat.js'
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
      }).state('dashboard.home',{
        url:'/dashboard/home/',
      //  controller: 'DashboardController',
        templateUrl:'app/components/dashboard/views/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'mtiba.dashboard',
              files:[
            //  'app/components/dashboard/directives/timeline/timeline.js',
            //  'app/components/dashboard/directives/chat/chat.js'
              ]
            })
          }
        }
      });
  /*  $stateProvider.state('detail', {
      url: '/detail/:id',
      templateUrl: 'detail/detail.html',
      controller: 'DetailCtrl as detail',
      resolve: {
        game: function ($http, $stateParams) {
          return $http.get(BASE_URL + "/game/" + $stateParams.id).then(function (res) {
            return res.data;
          })
        }
      }
    })
*/
//  viewCtrl.patient = Patient.get({id: $stateParams.id}


  $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .iconSet("avatars", './assets/svg/avatars.svg',128); 

  
}]);
mtibaApp.run(function($state) {
  $state.go('login'); //make a transition to form state when app starts
});