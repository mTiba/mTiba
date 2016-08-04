angular.module('yapili.doctors')

	.controller('DoctorAvatarController', function($scope, $http, $state, $stateParams, Doctor, Upload, $timeout){

	  var avatarCtrl = this;

	  avatarCtrl.doctor = Doctor.get({ id: $stateParams.id });

	  avatarCtrl.avatarData = [{
	    id: "avatars:svg-1",
	    title: 'avatar 1',
	    value: 'avatar-1'
	  },{
	    id: "avatars:svg-12",
	    title: 'avatar 2',
	    value: 'avatar-2'
	  },{
	    id: "avatars:svg-13",
	    title: 'avatar 3',
	    value: 'avatar-3'
	  }];

	  $scope.uploadPicture = function(file) {
	    alert("avatar picture upload will be soon implemented");
	    avatarCtrl.pictureFile = file;
	  }

	  avatarCtrl.selectAvatar = function(){

	    avatarCtrl.doctor.$update(function() {
	    //  $state.go('doctors'); // on success go back to home i.e. doctors state.
	      console.log(avatarCtrl.doctor.avatar_selected);
	    });


	    //TODO: post selected avatar info
	    $http({
	      method  : 'POST',
	      //url     : 'process.php',
	      url     : 'https://angular-file-upload-cors-srv.appspot.com/upload',
	      data    : { avatar: avatarCtrl.avatar },  // pass in data as strings
	      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	    })
	    .success(function(data) {
	      alert("avatar selection upload will be soon implemented");
	      $state.go('viewDoctor');
	        
	        /*if (!data.success) {
	          // if not successful, bind errors to error variables
	            $scope.errorName = data.errors.name;
	            $scope.errorSuperhero = data.errors.superheroAlias;
	        } else {
	          // if successful, bind success message to message
	            $scope.message = data.message;
	            $scope.errorName = '';
	            $scope.errorSuperhero = '';
	        }*/
	    });
	  }
	});
