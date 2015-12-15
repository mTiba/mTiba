angular.module('mtiba.patients')
.controller('PatientListController', function($scope, $state, popupService, $window, Patient, patientMetadataFactory) {
  

  var listCtrl = $scope;

  listCtrl.patients = Patient.query(function(p, getResponseHeaders){ //fetch all patients. Issues a GET to /api/patients
    //Call factory to get metadata and manipulate it there, accessing scope from there 
    listCtrl.metadata = patientMetadataFactory.getDataAndMapNames(p, $scope);   
  });

  listCtrl.deletePatient = function(patient) { // Delete a patient. Issues a DELETE to /api/patient/:id
    if (popupService.showPopup('Really delete this?')) {
      patient.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
  };
})
.controller('PatientViewController', function($scope, $stateParams, Patient, patientMetadataFactory, $http, $state) {

  var viewCtrl = $scope;

  viewCtrl.patient = Patient.get({id: $stateParams.id}, function(p, getResponseHeaders){
    //Call factory to get metadata and manipulate it there, accessing scope from there 
    viewCtrl.metadata = patientMetadataFactory.getDataAndMapNames(p, $scope);    
  });

  viewCtrl.openPictureUpload = function(){
    $state.go('selectPatientAvatar');
  };

})


.controller('PatientCreateController', function($scope, $http, $state, patientMetadataFactory, patientFormStepsFactory, Upload, $timeout, ngDialog, $stateParams, Patient) {

  var formCtrl = this;

  formCtrl.uiRouterState = $state;

  formCtrl.patient = new Patient();

  formCtrl.steps = patientFormStepsFactory.getSteps();

  formCtrl.metadata = patientMetadataFactory.getData();

  formCtrl.patient.health = {};
  formCtrl.patient.health.hospitalized_data= [
      {  year: '', reason: '' },
      {  year: '', reason: '' },
      {  year: '', reason: '' }
  ];

    // formCtrl.pictureFile = {};

  formCtrl.addPatient = function() { //create a new patient. Issues a POST to /api/patien
    formCtrl.patient.$save(function() {
      $state.go('patients'); // on success go back to home i.e. patients state.
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

.controller('PatientEditController', function($scope, $state, $stateParams, Patient, patientMetadataFactory, patientFormStepsFactory) {

  var formCtrl = this;
  
  formCtrl.uiRouterState = $state;

  formCtrl.steps = patientFormStepsFactory.getSteps();

  formCtrl.metadata = patientMetadataFactory.getData();

  formCtrl.updatePatient = function() { //Update the edited patient. Issues a PUT to /api/patient/:id
    formCtrl.patient.$update(function() {
      $state.go('patients'); // on success go back to home i.e. patients state.
    });
  };

  formCtrl.loadPatient = function() { //Issues a GET request to /api/patient/:id to get a patient to update  
    formCtrl.patient = Patient.get({ id: $stateParams.id }, function(p){

      formCtrl.patient.date_of_birth = new Date(p.date_of_birth);
      formCtrl.patient.health.blood_transfusion.last_time = new Date(p.health.blood_transfusion.last_time);

      for(var i=0; i<3; i++){
        if (typeof formCtrl.patient.health.hospitalized_data[i] === "undefined"){
          formCtrl.patient.health.hospitalized_data[i]= {  year: '', reason: '' };
        }
      }
    });
  };

  formCtrl.loadPatient(); // Load a patient which can be edited on UI
})

.controller('PatientAvatarController', function($scope, $http, $state, $stateParams, Patient, Upload, $timeout){

  var avatarCtrl = this;

  avatarCtrl.patient = Patient.get({ id: $stateParams.id });

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

    console.log(avatarCtrl.patient._avatar_selected_id);

    avatarCtrl.patient.$update(function() {
    //  $state.go('patients'); // on success go back to home i.e. patients state.
      console.log(avatarCtrl.patient.avatar_selected);
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
      $state.go('viewPatient');
        
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
