angular.module('mtiba.patients')

  .controller('PatientQuestionnaireController', function($scope, $http, $state, ngDialog, $stateParams, Questionnaire, reCAPTCHA) {

    var formCtrl = this;

    formCtrl.formSubmitted = false

    formCtrl.serverErrors = {};

    formCtrl.uiRouterState = $state;

    formCtrl.questionnaire = new Questionnaire();

    formCtrl.reasons_no_doctor_list = [
    'It is too expensive', 
    'The clinic is too far from my home', 
    'The waiting times are too long', 
    'I dont trust the advice of the doctor',
    'Other'
  ];


    formCtrl.submitResult = function() { //create a new questionnaire result. Issues a POST to /api/questionnaire
      formCtrl.formSubmitted=true;
      formCtrl.questionnaire.$save(function(data) {
          $state.go('patientQuestionnaire.success');
      }, function(error) {
          formCtrl.serverErrors.email = error.data.message;
          formCtrl.questionnaireForm.email.$setValidity('server', false);
      });
    };

    formCtrl.resetServerValidity = function(){
      formCtrl.serverErrors.email = "";
      formCtrl.questionnaireForm.email.$setValidity('server', true);
    }

  })
