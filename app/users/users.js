'use strict';

angular.module('myApp.users', [
    'ngRoute',
    'myApp',
    'myApp.person'
])


    .controller('UsersCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

        $scope.getUsers = function () {
            $http.get('http://127.0.0.1:8000/friends', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    data.forEach(function (item) {
                        item.id1 = item.user_one;
                        $http.get('http://127.0.0.1:8000/users/' + item.id1, {
                            headers: {
                                'Authorization': 'token ' + $cookies.get('Authorization'),
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (response) {
                                item.name1 = response.username
                            });

                        item.id2 = item.user_two;
                        $http.get('http://127.0.0.1:8000/users/' + item.id2, {
                            headers: {
                                'Authorization': 'token ' + $cookies.get('Authorization'),
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (response) {
                                item.name2 = response.username;
                            });
                    });
                    $scope.users = data;
                })
                .error(function () {
                    $scope.users = [];
                });
        };

    }]);