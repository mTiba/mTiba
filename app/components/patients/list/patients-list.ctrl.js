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
  });