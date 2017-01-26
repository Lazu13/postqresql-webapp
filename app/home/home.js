'use strict';

angular.module('myApp.home', [
    'myApp',
    'ui.router',
    'ngCookies'
])

    .controller('HomeCtrl', ['$scope', '$http', '$state', '$cookies', function ($scope, $http, $state, $cookies) {
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $scope.getCrimes = function () {
            $http.get('http://127.0.0.1:3000/top_three/crimes', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.crimes = data;
                })

                .error(function () {
                    $scope.crimes = [];
                });
        };

        $scope.getOffenses = function () {
            $http.get('http://127.0.0.1:3000/top_three/offenses', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.offenses = data;
                })

                .error(function () {
                    $scope.offenses = [];
                });
        };

        $scope.getPolicemen = function () {
            return $http.get('http://127.0.0.1:3000/top_three/policemen', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.policemen = data
                })

                .error(function () {
                    $scope.policemen = [];
                });
        };
    }]);