(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('DoctorRegisterController', DoctorRegisterController);

    DoctorRegisterController.$inject = ['DoctorUserService', '$state', '$rootScope', 'DoctorAuthenticationService', 'FlashService'];
    function DoctorRegisterController(DoctorUserService, $state, $rootScope, DoctorAuthenticationService, FlashService) {
        var registerCtrl = this;

        registerCtrl.register = register;
        registerCtrl.login = login;

        function register() {
            registerCtrl.dataLoading = true;
            DoctorUserService.Create(registerCtrl.user)
                .then(function (response) {
                    if (response.success) {
                        console.log("Registration successful")
                        FlashService.Success('Registration successful', true);
                        registerCtrl.login();
                    } else {
                        console.log(response.message)
                        FlashService.Error(response.message);
                        registerCtrl.dataLoading = false;
                    }
                });
        }

        function login() {
            registerCtrl.dataLoading = true;
            DoctorAuthenticationService.Login(registerCtrl.user.username, registerCtrl.user.password, function (response) {
                if (response.success) {
                    DoctorAuthenticationService.SetCredentials(registerCtrl.user.username, registerCtrl.user.password);
                    $state.go('newDoctor.basic');
                } else {
                    console.log(response.message);
                    FlashService.Error(response.message);
                    loginCtrl.dataLoading = false;
                }
            });
        };
    }

})();
