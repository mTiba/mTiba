angular.module('yapili.doctors')
.config(function($stateProvider) {
  $stateProvider
		.state('editDoctor', { //state for updating a doctor
      url: '/doctors/:id/edit',
      templateUrl: 'app/components/doctors/form/doctor-edit.html',
      controller: 'DoctorEditController',
      controllerAs: 'formCtrl',
      deepStateRedirect: { default: { state: 'editDoctor.basic' } }
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
                  name:'yapili.doctors',
                  files:[
                    'app/components/doctors/form/avatar-selector/avatar-selector.ctrl.js'
                  ]
              })
          }
        } 
    });
})
.controller('DoctorEditController', function($scope, $state, $stateParams, Doctor, doctorMetadataFactory, doctorFormStepsFactory) {
  var formCtrl = this;
  formCtrl.uiRouterState = $state;
  formCtrl.steps = doctorFormStepsFactory.getSteps();
  formCtrl.metadata = doctorMetadataFactory.getData();
  formCtrl.updateDoctor = function() { //Update the edited doctors. Issues a PUT to /api/doctors/:id
    formCtrl.doctor.$update(function() {
      $state.go('doctorDashboard.profile'); // on success go back to home i.e. doctors state.
    });
  };
  formCtrl.loadDoctor = function() { //Issues a GET request to /api/doctors/:id to get a doctor to update  
    formCtrl.doctor = Doctor.get({ id: $stateParams.id }, function(d){
      formCtrl.doctor.date_of_birth = new Date(d.date_of_birth);
    });
  };
  formCtrl.loadDoctor(); // Load a doctor which can be edited on UI
})
