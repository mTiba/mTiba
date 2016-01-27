(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$state', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $state, $rootScope, FlashService) {
        var registerCtrl = this;

        registerCtrl.register = register;

        function register() {
            registerCtrl.dataLoading = true;
            UserService.Create(registerCtrl.user)
                .then(function (response) {
                    if (response.success) {
                        console.log("Registration successful")
                        FlashService.Success('Registration successful', true);
                        $state.go('newDoctor');
                    } else {
                        console.log(response.message)
                        FlashService.Error(response.message);
                        registerCtrl.dataLoading = false;
                    }
                });
        }
    }

})();
