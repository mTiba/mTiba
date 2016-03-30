angular.module('mtiba.patients')

  .controller('PatientEditController', function($scope, $state, $stateParams, Patient, patientMetadataFactory, editPatientFormStepsFactory) {

    var formCtrl = this;
    
    formCtrl.uiRouterState = $state;

    formCtrl.steps = editPatientFormStepsFactory.getSteps();

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