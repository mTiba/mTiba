'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('mtiba.doctors.dashboard')
	.directive('chat',function(){

		var chatController = ['$scope', function ($scope) {
   		// Create a new Firebase reference, and a new instance of the Login client
			var chatRef = new Firebase('https://mtibachat.firebaseio.com/chat');

			this.name = 'Pascal',

			this.login = function() {
			  chatRef.authWithOAuthPopup("facebook", function(error, authData) {
			    if (error) {
			      console.log(error);
			    }
			  },{
				  remember: "sessionOnly",
				  scope: "email,user_likes"
				});
			/*  chatRef.authWithOAuthRedirect("facebook", function(error) {
				  if (error) {
				    console.log("Login Failed!", error);
				  } else { */
				    // We'll never get here, as the page will redirect on success.
				 /* }
				}); */
			}

			chatRef.onAuth(function(authData) {
			  // Once authenticated, instantiate Firechat with our user id and user name
			  if (authData) {
			    //this.initChat(authData);
			    var chat = new FirechatUI(chatRef, document.getElementById('firechat-wrapper'));
			  	chat.setUser(authData.uid, authData[authData.provider].displayName);
			  }
			});



			this.initChat = function(authData) {
			  var chat = new FirechatUI(chatRef, document.getElementById('firechat-wrapper'));
			  chat.setUser(authData.uid, authData[authData.provider].displayName);
			}
		}];

		return {
        templateUrl:'app/components/doctors/dashboard/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
        controller: chatController,
		    controllerAs: 'chatCtrl',
			//	template: '<div>{{chatCtrl.name}}</div>'
  	}

	});


