angular.module('yapili.patients.dashboard', [])
.config(function($stateProvider) {
  $stateProvider
    .state('patientDashboard', {
      url: '/patients/:id/dashboard',
      templateUrl: 'app/components/patients/dashboard/dashboard.html',
      deepStateRedirect: { default: { state: 'patientDashboard.home' } },
      resolve: {
        loadMyDirectives:function($ocLazyLoad){
            return $ocLazyLoad.load(
            {
                name:'yapili.patients.dashboard',
                files:[
                'app/components/patients/dashboard/directives/sidebar/sidebar.js',
                'app/components/patients/dashboard/directives/sidebar/sidebar-search/sidebar-search.js',
                'app/components/patients/dashboard/directives/timeline/timeline.js',
                'app/components/patients/dashboard/directives/chat/chat.js',
                'app/components/patients/profile/milestones/milestones.js'
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
      }).state('patientDashboard.intro', {
        url:'/intro',
        templateUrl:'app/components/patients/dashboard/dashboard-intro.html'
      }).state('patientDashboard.home', {
        url:'/home',
        templateUrl:'app/components/patients/dashboard/dashboard-home.html'
      }).state('patientDashboard.profile', {
        url:'/profile',
        templateUrl:'app/components/patients/dashboard/dashboard-profile.html',
        resolve: {
          loadMyDirectives:function($ocLazyLoad){
              return $ocLazyLoad.load(
              {
                  name:'yapili.patients',
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
                  name:'yapili.patients',
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
      });
})
