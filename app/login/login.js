'use strict';

angular.module('myApp.login', [
    'ui.validate',
    'ui.router',
    'ngCookies',
    'myApp'
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

            $http.post('http://127.0.0.1:3000/login',
                dataToSend,
                config
            )
                .success(function (data) {
                    console.log(data);
                    if (data.length > 0) {
                        $cookies.put('Roles', data[0].nazwa_uzytkownika.toString());
                        $cookies.put('Authorization', 'true');
                        alert("Logged in");
                        if ($rootScope.returnToState != undefined)
                            $state.go($rootScope.returnToState, $rootScope.returnToStateParams, {reload: true});
                        else
                            $state.go('home', {});
                    }
                    else
                        alert("Not logged in, there is not such a user!");
                })

                .error(function (err) {
                    $cookies.remove('Authorization');
                    alert("Not logged in: " + err);
                });
        }
    });