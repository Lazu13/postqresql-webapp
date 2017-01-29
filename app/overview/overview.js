'use strict';

angular.module('myApp.overview', [
    'ngRoute',
    'myApp'
])

    .controller('OverviewCtrl', function ($scope, $cookies, $http, $state) {

        $scope.closeModalA = function () {
            $('#myModalA').modal('hide');
            //$uibModalInstance.dismiss('cancel');
        };

        $scope.closeModalB = function () {
            $('#myModalB').modal('hide');
            //$uibModalInstance.dismiss('cancel');
        };

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

        $scope.getPeople = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/people', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);

                    $scope.people = data;
                    data.forEach(function (item) {
                        item.data_urodzenia = new Date(Date.parse(item.data_urodzenia)).toLocaleDateString();
                    });

                })
                .error(function () {
                    alert("Wybrany użytkownik nie istnieje");
                    $state.go('home');
                });
        };

        $scope.getOffenses = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/offenses', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.offenses = data;
                    $scope.offenses.forEach(function (item) {
                        item.data_wykroczenia = new Date(Date.parse(item.data_wykroczenia)).toLocaleDateString();
                        $http.get('http://127.0.0.1:3004/person/' + item.id_osoba_policjant, {
                            headers: {
                                'Authorization': 'token ' + $cookies.get('Authorization'),
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data) {
                                item.dane_policjant = data;
                            })
                            .error(function (response) {
                                alert("Error!. " + response);
                            });
                    });
                    console.log(data);
                })
                .error(function () {
                    alert("Wybrany użytkownik nie istnieje");
                    $state.go('home');
                });
        };

        $scope.getCrimes = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/crimes', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.crimes = data;
                    $scope.crimes.forEach(function (item) {
                        item.data_przestepstwa= new Date(Date.parse(item.data_przestepstwa)).toLocaleDateString();
                        $http.get('http://127.0.0.1:3004/person/' + item.id_osoba_policjant, {
                            headers: {
                                'Authorization': 'token ' + $cookies.get('Authorization'),
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data) {
                                item.dane_policjant = data;
                            })
                            .error(function (response) {
                                alert("Error!. " + response);
                            });
                    });
                    console.log(data);
                })
                .error(function () {
                    alert("Wybrany użytkownik nie istnieje");
                    $state.go('home');
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

        $scope.getPolicemen = function () {
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


    })
;