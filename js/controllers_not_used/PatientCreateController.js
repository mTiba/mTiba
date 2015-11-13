/**
 * Created by iFewalter on 10/24/15.
 */

    mtibaModule.controller('PatientCreateController', function($scope, $http, $state, patientMetadataFactory, patientFormStepsFactory, Upload, $timeout, ngDialog, $stateParams, Patient) {

        var formCtrl = this;
        //formCtrl.patientForm = {};

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
                console.log(formCtrl.patient.toJSON());
                $state.go('patients'); // on success go back to home i.e. patients state.
            });
        };

        formCtrl.openTermsConditions = function (){
            //alert("fsjkdfhdj");
            console.log("djjdhdfj");
            $scope.value = true;
            ngDialog.open({
                template: 'form/terms_and_conditions.html',
                className: 'ngdialog-theme-plain',
                scope: $scope,
                cache: false
            });
        };
    });