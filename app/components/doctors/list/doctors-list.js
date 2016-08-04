angular.module('yapili.doctors')

.config(function($stateProvider) {
  $stateProvider
  	.state('doctors', { // state for showing all doctors
	    url: '/doctors',
	    templateUrl: 'app/components/doctors/list/doctors-list.html',
	    controller: 'DoctorListController'
	  });
})
.controller('DoctorListController', function($scope, $state, popupService, $window, Doctor, doctorMetadataFactory) {
  var listCtrl = $scope;
   listCtrl.doctors = Doctor.query(function(p, getResponseHeaders){ //fetch all doctors. Issues a GET to /api/doctors
    //Call factory to get metadata and manipulate it there, accessing scope from there 
    listCtrl.metadata = doctorMetadataFactory.getDataAndMapNames(p, $scope);   
  });
  $scope.deleteDoctor = function(doctor) { // Delete a doctor. Issues a DELETE to /api/doctor/:id
    if (popupService.showPopup('Really delete this?')) {
      doctor.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
  };
})
