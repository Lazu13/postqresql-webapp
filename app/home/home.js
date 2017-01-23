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

        $scope.topGames = function () {
            $http.get('http://127.0.0.1:3000/', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    data.forEach(function (item) {
                        item.score = Math.round(item.score);
                    });
                    $scope.games = data;
                })

                .error(function () {
                    $scope.games = [];
                });
        };

        $scope.recommendedGames = function () {
            $http.get('http://127.0.0.1:8000/users/recommend/type/' + '0', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    data.forEach(function (item) {
                        item.score = Math.round(item.score);
                    });
                    $scope.recGames = data;
                })

                .error(function () {
                    $scope.recGames = [];
                });
        };

        $scope.recommendedGamesFriends = function () {
            return $http.get('http://127.0.0.1:8000/users/recommend/type/' + '1', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    data.forEach(function (item) {
                        item.score = Math.round(item.score);
                    });
                    $scope.recGamesFriends = data
                })

                .error(function () {
                    $scope.recGamesFriends = [];
                });
        };

        $scope.addToGameLib = function (id) {
            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            var friendToAdd = {
                "game": id
            };

            $http.post('http://127.0.0.1:8000/gamelib',
                friendToAdd,
                config
            )
                .success(function () {
                    alert("You have added new game to your game library");
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    if (response.detail == 'Invalid token.')
                        $state.go('login');
                })
        };

    }]);