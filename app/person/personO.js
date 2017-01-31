'use strict';

angular.module('myApp.personO', [
    'ngRoute',
    'myApp'
])

    .controller('PersonOCtrl', function ($scope, $http, $cookies, $state, $stateParams) {

        $scope.getPerson = function () {
            $http.get('http://127.0.0.1:3004/person/' + $stateParams.personId, {
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
                    }
                })
                .error(function () {
                    alert("Wybrany użytkownik nie istnieje");
                    $state.go('home');
                });
        };

        $scope.getOffenses = function () {
            $http.get('http://127.0.0.1:3004/person/offenses/' + $stateParams.personId, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.offenses = data;
                    $scope.offenses.forEach(function (item) {
                        item.data_wykroczenia = new Date(Date.parse(item.data_wykroczenia)).toLocaleDateString();
                        item.termin_od_wykroczenie = new Date(Date.parse(item.termin_od_wykroczenie)).toLocaleDateString();
                        item.termin_do_wykroczenie = new Date(Date.parse(item.termin_do_wykroczenie)).toLocaleDateString();
                    });


                })
                .error(function () {
                    alert("Nie można pozyskać zasobów");
                });

        };

        $scope.getCrimes = function () {
            $http.get('http://127.0.0.1:3004/person/crimes/' + $stateParams.personId, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.crimes = data;
                    $scope.crimes.forEach(function (item) {
                        item.data_przestepstwa = new Date(Date.parse(item.data_przestepstwa)).toLocaleDateString();
                        item.termin_od_przestepstwo= new Date(Date.parse(item.termin_od_przestepstwo)).toLocaleDateString();
                        item.termin_do_przestepstwo= new Date(Date.parse(item.termin_do_przestepstwo)).toLocaleDateString();
                    });

                })
                .error(function () {
                    alert("Nie można pozyskać zasobów");
                });

        }

    });