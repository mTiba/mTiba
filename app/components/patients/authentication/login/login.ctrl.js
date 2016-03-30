(function () {
    'use strict';

    angular.module('mtiba.authentication')

    .controller('PatientLoginController', function($state, AuthenticationService, FlashService) {

        var loginCtrl = this;

        loginCtrl.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();



        function login() {
            loginCtrl.dataLoading = true;
            AuthenticationService.Login(loginCtrl.username, loginCtrl.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(loginCtrl.username, loginCtrl.password);
                    //$state.go('patientDashboard.home({ id: contact.id })');
                    $state.go('patientDashboard.home');
                } else {
                    console.log(response.message);
                    FlashService.Error(response.message);
                    loginCtrl.dataLoading = false;
                }
            });
        };

    })

})();
