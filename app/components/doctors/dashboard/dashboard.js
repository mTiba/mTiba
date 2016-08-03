angular.module('mtiba.doctors.dashboard', [])
.config(function($stateProvider) {
  $stateProvider
    .state('doctorDashboard', {
      url: '/doctors/:id/dashboard',
      templateUrl: 'app/components/doctors/dashboard/dashboard.html',
      deepStateRedirect: { default: { state: 'doctorDashboard.home' } },
      resolve: {
        loadMyDirectives:function($ocLazyLoad){
          return $ocLazyLoad.load(
            {
              name:'mtiba.doctors.dashboard',
              files:[
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
    }).state('doctorDashboard.home',{
      url:'/home',
      templateUrl:'app/components/doctors/dashboard/dashboard-home.html'
    }).state('doctorDashboard.profile',{
      url:'/profile',
      templateUrl:'app/components/doctors/dashboard/dashboard-profile.html' 
    });
})
