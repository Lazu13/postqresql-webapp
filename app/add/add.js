'use strict';

angular.module('myApp.add', [
    'ngRoute',
    'myApp'
])

    .controller('AddCtrl', function ($scope, $cookies, $http, $state) {

        $scope.getUser = function () {
            $http.get('http://127.0.0.1:3004/user', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.myself = {};
                    $scope.myself.username = data.username;
                    $scope.myself.email = data.email;
                    $scope.myself.id = data.id;
                })
                .error(function (response) {
                    alert("Error!. " + response);
                });
        };

        $scope.getRanga = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/ranga', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.ranga = data;
                })
                .error(function (response) {
                    alert("Error!. " + response);
                });
        };

        $scope.getRodzajSluzb = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/rodzaj_sluzb', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.rodzajSluzb = data;
                })
                .error(function (response) {
                    alert("Error!. " + response);
                });
        };

        $scope.getKomisariat = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/komisariat', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.komisariat = data;
                })
                .error(function (response) {
                    alert("Error!. " + response);
                });
        };

        $scope.addPoliceman = function () {
            var policemanToAdd = {
                'currentId': $scope.newPoliceman.currentId,
                'currentRodzajSluzb': $scope.newPoliceman.currentRodzajSluzb.nazwa_rodzaj_sluzb,
                'currentRanga': $scope.newPoliceman.currentRanga.nazwa_rangi,
                'currentKomisariat': $scope.newPoliceman.currentKomisariat.nazwa_komisariat
            };

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:3004/person/policeman/add',
                policemanToAdd,
                config
            )
                .success(function () {
                    alert("Dodano nowego policjanta");
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    alert("Error!. " + response.detail);
                })
        };

        $scope.getZasob = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/zasob', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.zasob = data;
                })
                .error(function (response) {
                    alert("Error!. " + response);
                });
        };

        $scope.getKategoriaZasob = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/kategoria_zasob', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.kategoriaZasob = data;
                })
                .error(function (response) {
                    alert("Error!. " + response);
                });
        };

        $scope.getPolicjant = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/policjant', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.policjant = data;
                    $scope.policjant.forEach(function (item) {
                        $http.get('http://127.0.0.1:3004/person/' + item.id_dane_osobowe, {
                            headers: {
                                'Authorization': 'token ' + $cookies.get('Authorization'),
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data) {
                                item.dane_osobowe = data;
                            })
                            .error(function (response) {
                                alert("Error!. " + response);
                            });
                    });
                    console.log($scope.policjant);
                })
                .error(function (response) {
                    alert("Error!. " + response);
                });
        };

        $scope.addZasob = function () {
            var zasobToAdd = {
                'id_kategoria_zasob': $scope.kat.kategoriaZasob.id_kategoria_zasob,
                'stan_zasob': $scope.kat.stanZasob,
                'nazwa_zasob': $scope.kat.zasobName
            };

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:3004/add/zasob',
                zasobToAdd,
                config
            )
                .success(function () {
                    alert("Dodano zasob");
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response);
                    alert("Error!. " + response.name);
                })
        };

        $scope.addPolicemanZasob = function () {
            var policemanZasobToAdd = {
                'id_zasob': $scope.newPolicemanZasob.id_zasob.id_zasob,
                'id_kategoria_zasob': $scope.newPolicemanZasob.id_zasob.id_kategoria_zasob,
                'id_policjant': $scope.newPolicemanZasob.policjant.id_policjant
            };

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:3004/person/policeman_stuff/add',
                policemanZasobToAdd,
                config
            )
                .success(function () {
                    alert("Dodano zasob dla policjanta");
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response);
                    alert("Error!. " + response.name);
                })
        };

        $scope.addPerson = function () {
            $scope.person.date = new Date($scope.person.date).toLocaleDateString();
            var personToAdd = {
                'name': $scope.person.name,
                'surname': $scope.person.surname,
                'date': $scope.person.date,
                'nationality': $scope.person.nationality,
                'country': $scope.person.address.country,
                'city': $scope.person.address.city,
                'street': $scope.person.address.street,
                'number': $scope.person.address.number,
                'post_code': $scope.person.address.post_code
            };

            console.log(personToAdd);
            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:3004/person/add',
                personToAdd,
                config
            )
                .success(function (response) {
                    console.log(response);
                    alert("Dodano nową osobę o id: " + response[0].personinsert);
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response);
                    alert("Error!. Uzytkonik juz istnieje");
                })
        };

    });