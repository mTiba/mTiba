(function () {
    'use strict';

    angular
        .module('mtiba.authentication')
        .factory('PatientUserService', PatientUserService);

    PatientUserService.$inject = ['$http'];
    function PatientUserService($http) {
        var service = {};

        var api_address = 'http://sandbox.mtiba.me:8001/Patient/';

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.GetByUsernameAndPassword = GetByUsernameAndPassword;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        //http://sandbox.mtiba.me:8001/Patient/getUserById/UserId
        function GetById(id) {
            return $http.get(api_address + 'getUserById/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }


        //http://sandbox.mtiba.me:8001/Patient/authenticateUser
        function GetByUsernameAndPassword(data) {
            var req = {
             method: 'POST',
             url: api_address + 'authenticateUser',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             data: serializeData({'payload' : JSON.stringify(data)})
            };            
            return $http(req).then(handleSuccess, handleError('Error getting user by username and password'));
          //  return $http.post(api_address + 'authenticateUser', data ).then(handleSuccess, handleError('Error getting user by username and password'));
        }


        //http://sandbox.mtiba.me:8001/Patient/registerUser       
        function Create(user) {
            var req = {
             method: 'POST',
             url: api_address + 'registerUser',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             data: serializeData({'payload' : JSON.stringify(user)})
            };
            
            return $http(req).then(handleSuccess, handleError('Error creating user'));
            //return $http.post(api_address + 'registerUser', data).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
           return res;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        function serializeData( data ) {
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data == null ) ? "" : data.toString() );
            }
            var buffer = [];
            // Serialize each key in the object.
            for ( var name in data ) {
                if ( ! data.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = data[ name ];
                buffer.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join( "&" )
                .replace( /%20/g, "+" )
            ;
            return( source );
        }
    }


})();
