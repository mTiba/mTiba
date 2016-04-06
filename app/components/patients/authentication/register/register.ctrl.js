(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('PatientRegisterController', PatientRegisterController);

    PatientRegisterController.$inject = ['PatientUserService', '$state', '$rootScope', 'AuthenticationService','FlashService'];
    function PatientRegisterController(PatientUserService, $state, $rootScope, AuthenticationService, FlashService) {
        var registerCtrl = this;

        registerCtrl.register=function() {
            registerCtrl.dataLoading = true;
            PatientUserService.Create(registerCtrl.user)
                .then(function (response) {
                    //  if (response.data) {
                    if (response.success) {
                        console.log("Registration successful")
                        FlashService.Success('Registration successful', true);
                        registerCtrl.login();
                    } else {
                        console.log("response message: ");
                        FlashService.Error(response.message);
                        registerCtrl.dataLoading = false;
                    }
                });
        }


        registerCtrl.login=function() {
            registerCtrl.dataLoading = true;
            AuthenticationService.Login(registerCtrl.user.username, registerCtrl.user.password, function (response) {
                console.log(response);
                if (response.success) {
                    AuthenticationService.SetCredentials(registerCtrl.user.username, registerCtrl.user.password);
                    //$state.go('patientDashboard.home({ id: contact.id })');
                    $state.go('patientDashboard.intro');
                } else {
             //       console.log(response.message);
                    FlashService.Error(response.message);
                    registerCtrl.dataLoading = false;
                }
            });
        };
    }

})();
