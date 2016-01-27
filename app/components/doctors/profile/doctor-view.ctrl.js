angular.module('mtiba.doctors')

	.controller('DoctorViewController', function($scope, $stateParams, Doctor, doctorMetadataFactory, $http, $state) {

	  var viewCtrl = $scope;

	  viewCtrl.doctor = Doctor.get({id: $stateParams.id}, function(p, getResponseHeaders){
	    //Call factory to get metadata and manipulate it there, accessing scope from there 
	    viewCtrl.metadata = doctorMetadataFactory.getDataAndMapNames(p, $scope);    
	  });

	  viewCtrl.openPictureUpload = function(){
	    $state.go('doctorAvatar');
	  };
	});