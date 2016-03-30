(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('PatientUsersController', UsersController);

    UsersController.$inject = ['PatientUserService', '$rootScope'];
    function UsersController(PatientUserService, $rootScope) {
        var usersCtrl = this;

        usersCtrl.user = null;
        usersCtrl.allUsers = [];
        usersCtrl.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            console.log("Loading all patients's users");
        }

        function loadCurrentUser() {
            PatientUserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    usersCtrl.user = user;
                });
        }

        function loadAllUsers() {
            PatientUserService.GetAll()
                .then(function (users) {
                    usersCtrl.allUsers = users;
                });
        }

        function deleteUser(id) {
            PatientUserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();