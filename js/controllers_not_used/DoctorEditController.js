/**
 * Created by iFewalter on 10/24/15.
 */

mtibaModule.controller('DoctorEditController', function($scope, $state, $stateParams, Doctor, metadataFactory, doctorFormStepsFactory) {

        var formCtrl = this;

        formCtrl.uiRouterState = $state;

        formCtrl.steps = formStepsFactory.getSteps();

        formCtrl.metadata = metadataFactory.getData();


        formCtrl.updateDoctor = function() { //Update the edited doctors. Issues a PUT to /api/doctors/:id
            formCtrl.doctor.$update(function() {
                $state.go('doctors'); // on success go back to home i.e. doctors state.
            });
        };

        formCtrl.loadDoctor = function() { //Issues a GET request to /api/doctors/:id to get a doctor to update
            formCtrl.doctor = Doctor.get({ id: $stateParams.id });
        };

        formCtrl.loadDoctor(); // Load a doctor which can be edited on UI
    });