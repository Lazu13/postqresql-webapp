'use strict';

angular.module('myApp.person', [
    'ngRoute',
    'myApp'
])


    .controller('PersonCtrl', function ($scope, $http, $cookies, $state, $stateParams) {

        $scope.getUser = function () {
            $http.get('http://127.0.0.1:8000/users/' + $stateParams.personId, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.person = {};
                    $scope.person.name = data.username;
                    $scope.person.id = data.id;
                })
                .error(function () {
                    alert("There is not such a user in database");
                    $state.go('users');
                });
        };

        $scope.addToFriends = function (id) {
            var r = confirm("Add user to your friendship list?");
            if (r == true) {
                var config = {
                    headers: {
                        'Authorization': 'token ' + $cookies.get('Authorization'),
                        'Content-Type': 'application/json'
                    }
                };

                var friendToAdd = {
                    "user_two": id
                };

                $http.post('http://127.0.0.1:8000/friends/pending/add',
                    friendToAdd,
                    config
                )
                    .success(function () {
                        alert("You have send invitation");
                        $state.go('notification');
                    })
                    .error(function (response) {
                        alert("Error!: " + response);
                    })
            }
        };
    });