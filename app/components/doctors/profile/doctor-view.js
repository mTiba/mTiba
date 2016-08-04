angular.module('yapili.doctors')

.config(function($stateProvider) {
  $stateProvider
    .state('viewDoctor', {
      url: '/doctors/:id/view',
      controller: 'DoctorViewController',
      controllerAs: 'viewCtrl',
      //templalte: '<div>{{viewCtrl.doctor}}</div>'
      templateUrl: 'app/components/doctors/profile/doctor-view.html'
    });
})
.controller('DoctorViewController', function($scope, $stateParams, Doctor, doctorMetadataFactory, $http, $state) {
  var viewCtrl = this;
  viewCtrl.doctor = Doctor.get({id: $stateParams.id}, function(d, getResponseHeaders){
    //Call factory to get metadata and manipulate it there, accessing scope from there 
    viewCtrl.metadata = doctorMetadataFactory.getDataAndMapNames(d, viewCtrl);
  });
  viewCtrl.openPictureUpload = function(){
    $state.go('doctorAvatar');
  };
});
