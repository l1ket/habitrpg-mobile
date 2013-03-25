'use strict';

/**
 * Services that persists and retrieves user from localStorage.
 */

angular.module('authServices', ['userServices']).
    factory('Facebook', function($http, User){
        //TODO FB.init({appId: '${section.parameters['facebook.app.id']}', status: true, cookie: true, xfbml: true});
        var auth,
            user;

        User.get(function(data){
            user = data;
        })

        return {

            getAuth: function() {
                return auth;
            },

            login: function() {
                user.id = 'fe4ebe85-137c-4e6a-b8a4-9d117b02310c';
                user.apiToken = 'd805aaee-d74b-469c-ba16-d58e0b84e29a';
                User.authenticate();
                return;

                FB.login(function(response) {
                    if (response.authResponse) {
                        // 1. get userid & accesstoken
                        var uid = response.authResponse.userID;
                        var accessToken = response.authResponse.accessToken;
                        // 2. store in user
                        // 3. authenticate()
                        debugger;
                    } else {
                        console.log('Facebook login failed', response);
                    }
                })
            },

            logout: function() {
                FB.logout(function(response) {
                    if(response) {
                        // todo what to do here?
                        debugger;
                    } else {
                        console.log('Facebook logout failed.', response);
                    }
                })
            }
        }

    })

   .factory('LocalAuth', function($http, User){

        var auth,
            user;

        User.get(function(data){
            user = data;
        })

        return {

            getAuth: function() {
                return auth;
            },

            login: function() {
                // fixme temporary hard-coded
                user.id = '91dae4a1-895f-4698-a768-67ec0c8293bb';
                user.apiToken = 'e984549d-6364-42eb-beec-1f075d80381d';
                User.authenticate();
                return;

            },

            logout: function() {
            }
        }

    });
