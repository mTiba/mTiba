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

  $ocLazyLoadProvider.config({
    debug:false,
    events:true,
  });

  $urlRouterProvider.otherwise('/login');
  
  $stateProvider
      .state('termsAndConditions', {
          url: '/doctors/terms',
          templateUrl: 'app/components/doctors/form/partials/_terms_and_conditions.html'
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

