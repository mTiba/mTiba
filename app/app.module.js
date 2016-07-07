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
  'vcRecaptcha',
  'mtiba.questionnaire'
  ]);

mtibaApp.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider', '$mdIconProvider', '$mdThemingProvider', 
        function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider, $mdIconProvider, $mdThemingProvider) {


  $ocLazyLoadProvider.config({
    debug:false,
    events:true,
  });

  $urlRouterProvider.otherwise('/patients/questionnaire/form');
  
  $stateProvider
      .state('patientQuestionnaire', { //questionnaire
          url: '/patients/questionnaire',
          templateUrl: 'app/components/patients/questionnaire/questionnaire.html',
          resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'mtiba.questionnaire',
                    files:[
                      'app/components/patients/questionnaire/questionnaire.ctrl.js'
                    ]
                })
            }
          } 
      }).state('patientQuestionnaire.form', { //questionnaire success
          url: '/form',
          templateUrl: 'app/components/patients/questionnaire/form.html'
      }).state('patientQuestionnaire.success', { //questionnaire success
          url: '/success',
          templateUrl: 'app/components/patients/questionnaire/success.html'
      });
}]);

mtibaApp.run(['$state', '$rootScope', '$location', '$cookieStore', '$http', function($state, $rootScope, $location, $cookieStore, $http) {
  $state.go('patientQuestionnaire.form'); //make a transition to form state when app starts

  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  }
}]);

