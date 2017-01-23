/**
 * Created by Tom on 15.12.2016.
 */
'use strict';

angular.module('myApp.user_profile', [
    'ngRoute',
    'myApp'
])


    .controller('UserProfileCtrl', function ($scope, $cookies, $http, $state) {

        $scope.getUser = function () {
            $http.get('http://127.0.0.1:8000/user', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.myself = {};
                    $scope.myself.username = data.username;
                    $scope.myself.email = data.email;
                    $scope.myself.id = data.id;
                })
                .error(function (reponse) {
                    alert("Error!. " + response);
                });
        };
    });