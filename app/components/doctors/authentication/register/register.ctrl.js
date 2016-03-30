(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('DoctorRegisterController', DoctorRegisterController);

    DoctorRegisterController.$inject = ['DoctorUserService', '$state', '$rootScope', 'FlashService'];
    function DoctorRegisterController(DoctorUserService, $state, $rootScope, FlashService) {
        var registerCtrl = this;

        registerCtrl.register = register;

        function register() {
            registerCtrl.dataLoading = true;
            DoctorUserService.Create(registerCtrl.user)
                .then(function (response) {
                    if (response.success) {
                        console.log("Registration successful")
                        FlashService.Success('Registration successful', true);
                        $state.go('newDoctor.basic');
                    } else {
                        console.log(response.message)
                        FlashService.Error(response.message);
                        registerCtrl.dataLoading = false;
                    }
                });
        }
    }

})();
