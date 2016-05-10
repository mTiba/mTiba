(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('PatientUsersController', PatientUsersController);

    PatientUsersController.$inject = ['PatientUserService', '$rootScope', 'config'];
    function PatientUsersController(PatientUserService, $rootScope, config) {
        var usersCtrl = this;
        
        usersCtrl.config = config;

        usersCtrl.user = null;
        usersCtrl.allUsers = [];
        usersCtrl.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            console.log("Loading all patients's users");
        }

        //TODO: do current user global
        function loadCurrentUser() {
            PatientUserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    usersCtrl.user = user;
                    usersCtrl.user.type = "patient";
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