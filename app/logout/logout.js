'use strict';

angular.module('myApp.logout', [
    'ui.validate',
    'ui.router',
    'ngCookies',
    'myApp'
])

    .controller('LogoutCtrl', function ($scope, $state, $http, $cookies) {

        $scope.destroy_token = function () {
            $cookies.remove('Authorization');
            alert("Wylogowane pomyślnie");
            $state.go('home');
        }

    });