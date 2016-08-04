angular.module('yapili.login', [
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
/*      controller: 'LoginCtrl',*/
      templateUrl: 'app/components/login/login.view.html'
    });
})
/*.controller('LoginCtrl', function($scope, auth, $state) {
  auth.signin({
    standalone: true,
    chrome: true
  });

})*/;
