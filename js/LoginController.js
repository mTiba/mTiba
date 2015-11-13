/**
 * Created by iFewalter on 10/24/15.
 */
mtibaModule.controller('LoginController', function($scope, $stateParams, $http, $location) {

$scope.loginForm = {email:"",password:""};

    $scope.login = function()
    {
        alert('yay');
        $http.post('http://localhost:8123/public_html/index.php/auth', $scope.loginForm).success(function(data, status, headers,config){

            console.log(data);
            console.log(data.account_type);
            if (data.account_type == '2')
            {
                $location.path('patients');
            }
            else{
                $location.path('doctors');
            }

        }).error(function(data, status, headers, config){
            alert('Login Failed')
        })
    }

});