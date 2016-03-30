(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('DoctorsUsersController', UsersController);

    UsersController.$inject = ['DoctorUserService', '$rootScope'];
    function UsersController(DoctorUserService, $rootScope) {
        var usersCtrl = this;

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