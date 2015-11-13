mtibaModule
.controller('DoctorListController', function($scope, $state, popupService, $window, Doctor) {
  
  $scope.doctor = Doctor.query(); //fetch all doctor. Issues a GET to /api/patie

  $scope.deleteDoctor = function(doctor) { // Delete a doctor. Issues a DELETE to /api/doctor/:id
    if (popupService.showPopup('Really delete this?')) {
      doctor.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
  };
})
.controller('DoctorViewController', function($scope, $stateParams, Doctor, doctorMetadataFactory, $http, $state) {

  var viewCtrl = $scope;

  viewCtrl.doctor = Doctor.get({id: $stateParams.id}, function(p, getResponseHeaders){
    //Call factory to get metadata and manipulate it there, accessing scope from there 
    viewCtrl.metadata = doctorMetadataFactory.getDataAndMapNames(p, $scope);    
  });

  viewCtrl.openPictureUpload = function(){
    $state.go('selectDoctorAvatar');
  };

})


.controller('DoctorCreateController', function($scope, $http, $state, doctorMetadataFactory, doctorFormStepsFactory, Upload, $timeout, ngDialog, $stateParams, Doctor) {

  var formCtrl = this;

  formCtrl.uiRouterState = $state;

  formCtrl.doctor = new Doctor();

  formCtrl.steps = doctorFormStepsFactory.getSteps();

  formCtrl.metadata = doctorMetadataFactory.getData();

  formCtrl.doctor.health = {};
    
  formCtrl.doctor.health.hospitalized_data= [
      {  year: '', reason: '' },
      {  year: '', reason: '' },
      {  year: '', reason: '' }
  ];



  /*formCtrl.appendForm = function(){
    //document.getElementsByTagName("form")[0].setAttribute("name", "doctorForm");
    var newElement = '<form class="form-horizontal" role="form" name="doctorForm" ng-submit="formCtrl.addDoctor()" novalidate>';
    var stepElement = document.getElementsByClassName("multi-step-body")[0];
    stepElement.innerHTML = newElement + stepElement.innerHTML + '</form>'; ;
  };
  setTimeout(formCtrl.appendForm, 300);
*/

  // formCtrl.pictureFile = {};
  formCtrl.addDoctor = function() { //create a new doctor. Issues a POST to /api/doctors
    formCtrl.doctor.$save(function() {
      $state.go('doctors'); // on success go back to home i.e. doctors state.
    });
  };

  formCtrl.openTermsConditions = function (){
    $scope.value = true;
    ngDialog.open({
      template: 'form/terms_and_conditions.html',
      className: 'ngdialog-theme-plain',
      scope: $scope,
      cache: false
    });
  };



})

.controller('DoctorEditController', function($scope, $state, $stateParams, Doctor, doctorMetadataFactory, doctorFormStepsFactory) {

  var formCtrl = this;
  
  formCtrl.uiRouterState = $state;

  formCtrl.steps = doctorFormStepsFactory.getSteps();

  formCtrl.metadata = doctorMetadataFactory.getData();


  formCtrl.updateDoctor = function() { //Update the edited doctors. Issues a PUT to /api/doctors/:id
    formCtrl.doctor.$update(function() {
      $state.go('doctors'); // on success go back to home i.e. doctors state.
    });
  };

  formCtrl.loadDoctor = function() { //Issues a GET request to /api/doctors/:id to get a doctor to update  
    formCtrl.doctor = Doctor.get({ id: $stateParams.id });
  };

  formCtrl.loadDoctor(); // Load a doctor which can be edited on UI
})

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

    console.log(avatarCtrl.doctor._avatar_selected_id);

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
