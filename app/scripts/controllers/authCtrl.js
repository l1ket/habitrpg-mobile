'use strict';

/**
 * The authentication controller (login & facebook)
 *
 */

habitrpg.controller('AuthCtrl',
  ['$scope', '$rootScope', 'Facebook', 'LocalAuth', 'User', '$http', '$location', 'API_URL',
  function($scope, $rootScope, Facebook, LocalAuth, User, $http, $location, API_URL) {
    $scope.Facebook = Facebook;
    $scope.Local = LocalAuth;

    var showedFacebookMessage = false
    $scope.useUUID = false;
    $scope.toggleUUID = function() {
      if (showedFacebookMessage == false) {
        alert("We don't yet have Facebook login, instead enter your UUID and API Token (found at https://habitrpg.com > Options > Settings).")
        showedFacebookMessage = true;
      }
      $scope.useUUID = !$scope.useUUID;
    }

    document.addEventListener('deviceready', function() {

      FB.init({
        appId: '374812825970494',
        nativeInterface: CDV.FB,
        useCachedDialogs: false
      });

    }, false);

    $scope.register = function() {
      $http.post(API_URL + '/api/v1/register', $scope.registerVals)
        .success(function(data, status, headers, config) {
          User.authenticate(data.id, data.apiToken, function(err) {
            $location.path("/habit");
          });
        })
        .error(function(data, status, headers, config) {
          if (status === 0) {
            alert("Server not currently reachable, try again later");
          } else if (!!data && !!data.err) {
            alert(data.err);
          } else {
            alert('ERROR: ' + status);
          }
        });
    }

    $scope.auth = function() {
      var data = {
        username: $scope.loginUsername,
        password: $scope.loginPassword
      }

      var runAuth = function(id, token){
        User.authenticate(id, token, function(err) {
          $location.path("/habit");
        });
      }

      if ($scope.useUUID) {
        runAuth($scope.loginUsername, $scope.loginPassword);
      } else {
        $http.post(API_URL + '/api/v1/user/auth/local', data)
          .success(function(data, status, headers, config) {
            runAuth(data.id, data.token);
          }).error(function(data, status, headers, config) {
            if (status === 0) {
              alert("Server not currently reachable, try again later");
            } else if (!!data && !!data.err) {
              alert(data.err);
            } else {
              alert('ERROR: ' + status);
            }
          });
      }
    }
  }
]);
