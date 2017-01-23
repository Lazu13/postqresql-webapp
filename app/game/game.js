'use strict';

angular.module('myApp.game', [
    'myApp.home',
    'ui.router',
    'ngCookies',
    'angular-input-stars'
])

    .controller('GameCtrl', ['$scope', '$state', '$stateParams', '$http', '$cookies', function ($scope, $state, $stateParams, $http, $cookies) {
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $scope.getGame = function () {
            $http.get('http://127.0.0.1:8000/games/' + $stateParams.gameId, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    data.score = Math.round(data.score);
                    $scope.sampleGame = data;
                })
                .error(function () {
                    alert("There is not such a game in database");
                    $state.go('games');
                });
        };

        var getComment = function (item, reviews) {
            $http.get('http://127.0.0.1:8000/users/' + item, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    for (var i in reviews) {
                        if (reviews[i].user == item) {
                            reviews[i].username = data.username;
                        }
                    }
                })

                .error(function () {
                    reviews = [];
                })
        };

        $scope.getComments = function () {
            $http.get('http://127.0.0.1:8000/reviews/' + $stateParams.gameId, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.reviews = [];
                    for (var item in data) {
                        $scope.reviews.push({
                            'user': data[item].user,
                            'review': data[item].review
                        });
                    }
                    for (item in data) {
                        getComment(data[item].user, $scope.reviews);
                    }
                })

                .error(function () {
                    $state.go('game', {}, {reload: true});
                });
        };


        $scope.clickHandler = function (starRating) {
            $scope.starRating = starRating;
        };

        $scope.prepareUser = function () {
            $scope.starRating = 5;
            $http.get('http://127.0.0.1:8000/user', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.userId = data.id;
                })
                .error(function (err) {
                    alert(err + " went wrong");
                });
        };

        $scope.confirmation = function () {
            var r = confirm("Add comment?");
            if (r == true) {
                var reviewToAdd = {
                    'game': $stateParams.gameId,
                    'review': $scope.commentRating
                };

                var scoreToAdd = {
                    'user_id': $scope.userId,
                    'game_id': $stateParams.gameId,
                    'score': $scope.starRating
                };

                var config = {
                    headers: {
                        'Authorization': 'token ' + $cookies.get('Authorization'),
                        'Content-Type': 'application/json'
                    }
                };

                $http.post('http://127.0.0.1:8000/reviews/add',
                    reviewToAdd,
                    config
                )
                    .success(function () {
                        $http.post('http://127.0.0.1:8000/games/' + $stateParams.gameId + '/grade',
                            scoreToAdd,
                            config
                        )
                            .error(function (response) {
                                alert('Grade was not added. Reason: ' + response.message);
                                $state.go($state.current, {}, {reload: true});
                            })

                            .then(function () {
                                alert('Comment added');
                                $state.go($state.current, {}, {reload: true});
                            });
                    })

                    .error(function (response) {
                        alert('Neither comment nor grade was added. Reason: ' + response.message);
                        $state.go($state.current, {}, {reload: true});
                    });
            }

            else {
                alert('Comment was not added');
                $state.go($state.current, {}, {reload: true});
            }
        };
    }]);