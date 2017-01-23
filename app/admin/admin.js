'use strict';

angular.module('myApp.admin', [
    'ui.validate',
    'ui.router',
    'myApp'
])

    .controller('AdminCtrl', function ($scope, $state, $http, $cookies) {

        $scope.addGame = function () {
            var gameToAdd = {
                'title': $scope.game.title,
                'description': $scope.game.description,
                'platform': $scope.game.platform,
                'url': $scope.game.uri
            };

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:8000/games/add',
                gameToAdd,
                config
            )
                .success(function () {
                    alert("You have added new game");
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    alert("Error!. " + response.detail);
                })
        };

        $scope.editGame = function () {
            console.log($scope.editGame.id);
            var gameToAdd = {
                'id': $scope.editGame.id,
                'title': $scope.editGame.title,
                'description': $scope.editGame.description,
                'platform': $scope.editGame.platform,
                'url': $scope.editGame.url
            };

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.put('http://127.0.0.1:8000/games/' + $scope.editGame.id,
                gameToAdd,
                config
            )
                .success(function (response) {
                    alert("You have edited old game. You changed the game: " + response.title);
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response);
                    alert("Error!. ");
                })
        };

        $scope.deleteGame = function () {
            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.delete('http://127.0.0.1:8000/games/' + $scope.deleteGame.id,
                config
            )
                .success(function (response) {
                    alert("You have deleted game.");
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response);
                    alert("Error!. " + response.detail);
                })
        };

    });