/**
 * Created by iFewalter on 10/24/15.
 */

mtibaModule.controller('DoctorListController', function($scope, $state, popupService, $window, Doctor) {

        $scope.doctor = Doctor.query(); //fetch all doctor. Issues a GET to /api/patie

        $scope.deleteDoctor = function(doctor) { // Delete a doctor. Issues a DELETE to /api/doctor/:id
            if (popupService.showPopup('Really delete this?')) {
                doctor.$delete(function() {
                    $window.location.href = ''; //redirect to home
                });
            }
        };
    });