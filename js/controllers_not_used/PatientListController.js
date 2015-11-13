/**
 * Created by iFewalter on 10/24/15.
 */
mtibaModule.controller('PatientListController', function($scope, $state, popupService, $window, Patient) {

        $scope.patient = Patient.query(); //fetch all patients. Issues a GET to /api/patient

        $scope.deletePatient = function(patient) { // Delete a patient. Issues a DELETE to /api/patien/:id
            if (popupService.showPopup('Really delete this?')) {
                patient.$delete(function() {
                    $window.location.href = ''; //redirect to home
                });
            }
        };
    });