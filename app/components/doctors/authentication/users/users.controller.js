(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['UserService', '$rootScope'];
    function UsersController(UserService, $rootScope) {
        var usersCtrl = this;

        usersCtrl.user = null;
        usersCtrl.allUsers = [];
        usersCtrl.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    usersCtrl.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    usersCtrl.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();