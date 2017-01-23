'use strict';

angular.module('myApp.login', [
    'ui.validate',
    'ui.router',
    'ngCookies',
    'myApp',
    'myApp.register'
])

    .controller('LoginCtrl', function ($scope, $rootScope, $state, $http, $cookies) {

        $scope.goto = function () {
            var dataToSend = {
                'username': $scope.user.name,
                'password': $scope.user.password
            };

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:8000/users/login',
                dataToSend,
                config
            )
                .success(function (data) {
                    $cookies.put('Authorization', data.token);
                    $http.get('http://127.0.0.1:8000/user', {
                        headers: {
                            'Authorization': 'token ' + $cookies.get('Authorization'),
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function (data) {
                            if (data.is_superuser)
                                $cookies.put('Roles', "admin");
                            else
                                $cookies.put('Roles', "user");
                        })

                        .then(function () {
                            alert("Logged in");
                            if ($rootScope.returnToState != undefined)
                                $state.go($rootScope.returnToState, $rootScope.returnToStateParams, {reload: true});
                            else
                                $state.go('home', {});
                        });
                })
                .error(function (err) {
                    $cookies.remove('Authorization');
                    alert("Not logged in: " + err);
                });
        }
    });