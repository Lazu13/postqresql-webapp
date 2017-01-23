'use strict';

angular.module('myApp.friends', [
    'ngRoute',
    'myApp',
    'myApp.person'
])


    .controller('FriendsCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies, $state, $stateParams) {

        $scope.getFriends = function () {
            $http.get('http://127.0.0.1:8000/friends/my', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.friends = [];
                    data.forEach(function (item) {
                        $scope.friends.push({"name": item.username});
                    });
                })
                .error(function (response) {
                    alert("Error!. " + response);
                    $scope.friends = [];
                });
        };

    }]);