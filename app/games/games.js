'use strict';

angular.module('myApp.games', [
    'myApp',
    'ngCookies'
])

    .controller('GamesCtrl', function ($scope, $http) {
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $scope.getGames = function () {
            $http.get('http://127.0.0.1:8000/games', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    data.forEach(function (item) {
                        item.readNum = 25;
                        item.readMoreText = "Read more";
                        item.score = Math.round(item.score);
                    });
                    $scope.games = data;
                })
                .error(function () {
                    $scope.games = [];
                });
        };

        $scope.readMore = function (exsampleGame) {
            if (exsampleGame.readMoreText == "Read more") {
                exsampleGame.readNum = 100;
                exsampleGame.readMoreText = "Read less";
                jQuery(".readMoreTextDots").html("")
            }
            else {
                exsampleGame.readNum = 25;
                exsampleGame.readMoreText = "Read more";
                jQuery(".readMoreTextDots").html('...')
            }
        }
    });