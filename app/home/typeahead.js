/**
 * Created by Tom on 16.12.2016.
 */
'use strict';

angular.module('myApp.typeahead', [
    'ui.router',
    'ngRoute',
    'ngCookies',
    'myApp',
    'myApp.person',
    'ngAnimate',
    'ui.bootstrap'
])

    .controller('TypeaheadCtrl', ['$scope', '$rootScope', '$state', '$http', '$cookies', function ($scope, $rootScope, $state, $http, $cookies) {

        $scope.data = [
            {id: 0, name: 'Games', value: 'valueGames'},
            {id: 1, name: 'Users', value: 'usersGames'}
        ];

        $scope.selectedValue = '';
        $scope.selection = '';

        $scope.changeSelection = function () {
            $rootScope.selection = $scope.selectedValue;
        };

        $scope.getValues = function (val) {
            var dataToSend = {
                'substring': val
            };

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            if ($rootScope.selection== undefined)
                return;

            if ($rootScope.selection.id == $scope.data[1].id) {
                return $http.post('http://127.0.0.1:8000/users/users/search',
                    dataToSend,
                    config
                )
                    .then(function (response) {
                        return response.data.map(function (item) {
                            item.title = item.username;
                            return item;
                        });
                    });
            }
            else if ($rootScope.selection.id == $scope.data[0].id) {
                return $http.post('http://127.0.0.1:8000/users/games/search',
                    dataToSend,
                    config
                )
                    .then(function (response) {
                        return response.data.map(function (item) {
                            return item;
                        });
                    });
            }
        };

        $scope.goOn = function ($item) {
            if ($rootScope.selection.id == $scope.data[1].id) {
                $state.go('person', {"personId": $item.id});
            }
            else if ($rootScope.selection.id == $scope.data[0].id) {
                $state.go('game', {"gameId": $item.id});
            }
        };
    }]);