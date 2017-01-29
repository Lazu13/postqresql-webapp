'use strict';

angular.module('myApp.person', [
    'ngRoute',
    'myApp'
])

    .controller('PersonCtrl', function ($scope, $http, $cookies, $state, $stateParams) {

        $scope.getPoliceman = function () {
            $http.get('http://127.0.0.1:3004/person/policeman/' + $stateParams.personId, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data[0]);
                    if (data.length <= 0) {
                        alert("Wybrany użytkownik nie istnieje");
                        $state.go('home');
                    }
                    else {
                        $scope.person = data[0];
                        $scope.person.data_urodzenia = new Date(Date.parse($scope.person.data_urodzenia)).toLocaleDateString();
                        $http.get('http://127.0.0.1:3004/person/policeman_stuff/' + $scope.person.id_policjant, {
                            headers: {
                                'Authorization': 'token ' + $cookies.get('Authorization'),
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data) {
                                console.log(data);
                                $scope.zasob = data;
                            })
                            .error(function () {
                                alert("Nie można pozyskać zasobów");
                            });
                    }
                })
                .error(function () {
                    alert("Wybrany użytkownik nie istnieje");
                    $state.go('home');
                });
        };
    });