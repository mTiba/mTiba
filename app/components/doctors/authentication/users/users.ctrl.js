(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('DoctorUsersController', DoctorUsersController);

    DoctorUsersController.$inject = ['DoctorUserService', '$rootScope', 'config'];
    function DoctorUsersController(DoctorUserService, $rootScope, config) {
        var usersCtrl = this;

        usersCtrl.config = config;

        usersCtrl.user = null;
        usersCtrl.allUsers = [];
        usersCtrl.deleteUser = deleteUser;

        initController();
   
        function initController() {
            loadCurrentUser();
            loadAllUsers();
            console.log("Loading all doctors's users");
        }

        function loadCurrentUser() {
            DoctorUserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    usersCtrl.user = user;
                    usersCtrl.user.type = "doctor";
                    console.log(usersCtrl.user);
                });
        }

        function loadAllUsers() {
            DoctorUserService.GetAll()
                .then(function (users) {
                    usersCtrl.allUsers = users;
                });
        }

        function deleteUser(id) {
            DoctorUserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();