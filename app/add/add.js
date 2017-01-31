'use strict';

angular.module('myApp.add', [
    'ngRoute',
    'myApp'
])

    .controller('AddCtrl', function ($scope, $cookies, $http, $state, dateFilter) {
        $scope.offenseFin = {};
        $scope.offenseFin.date = new Date();
        $scope.offenseFin.dateTo = new Date();


        $scope.$watch('offenseFin.date', function (date) {
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var y = date.getFullYear();
            if ($scope.offense != undefined) {
                var inter_dd;
                var inter_mm;
                var inter_y;
                var someFormattedDate;
                if ($scope.offense[0].ograniczenie_wolnosci_wykroczenie != null) {
                    inter_dd = $scope.offense[0].ograniczenie_wolnosci_wykroczenie.days;
                    if (inter_dd == undefined)
                        inter_dd = 0;
                    inter_mm = $scope.offense[0].ograniczenie_wolnosci_wykroczenie.months;
                    if (inter_mm == undefined)
                        inter_mm = 0;
                    inter_y = $scope.offense[0].ograniczenie_wolnosci_wykroczenie.years;
                    if (inter_y == undefined)
                        inter_y = 0;
                    dd = dd + inter_dd;
                    mm = mm + inter_mm;
                    y = y + inter_y;
                    someFormattedDate = new Date(y + '-' + mm + '-' + dd);
                    $scope.offenseFin.dateTo = new Date(dateFilter(someFormattedDate, 'yyyy-MM-dd'));
                    console.log($scope.offenseFin.dateTo);
                }
                if ($scope.offense[0].areszt_wykroczenie != null) {
                    inter_dd = $scope.offense[0].areszt_wykroczenie.days;
                    if (inter_dd == undefined)
                        inter_dd = 0;
                    inter_mm = $scope.offense[0].areszt_wykroczenie.months;
                    if (inter_mm == undefined)
                        inter_mm = 0;
                    inter_y = $scope.offense[0].areszt_wykroczenie.years;
                    if (inter_y == undefined)
                        inter_y = 0;
                    dd = dd + inter_dd;
                    mm = mm + inter_mm;
                    y = y + inter_y;
                    someFormattedDate = new Date(y + '-' + mm + '-' + dd);
                    $scope.offenseFin.dateTo = new Date(dateFilter(someFormattedDate, 'yyyy-MM-dd'));
                    console.log($scope.offenseFin.dateTo);
                }
            }
        });

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

        $scope.getZaklad = function () {
            $http.get('http://127.0.0.1:3004/dictionaries/zaklad', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.zaklad = data;
                })
                .error(function (response) {
                    alert("Error!. " + response);
                });
        };

        $scope.getOffense = function (val) {
            $http.get('http://127.0.0.1:3004/dictionaries/offense' + val, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.offense = data;
                    if ($scope.offense.length > 0) {
                        $scope.offense.forEach(function (item) {
                            item.data_wykroczenia = new Date(Date.parse(item.data_wykroczenia)).toLocaleDateString();
                        });
                    }
                    else {
                        alert("Wykroczenie o podanym id nie istnieje");
                        $scope.offenseFin = '';
                    }
                })
                .error(function () {
                    alert("Nie można pozyskać zasobów");
                });

        };

        $scope.getCrime = function (val) {
            $http.get('http://127.0.0.1:3004/dictionaries/crime' + val, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.crime = data;
                    if ($scope.crime.length > 0) {
                        $scope.crime.forEach(function (item) {
                            item.data_przestepstwa = new Date(Date.parse(item.data_przestepstwa)).toLocaleDateString();
                        });
                    }
                    else {
                        alert("Przestepstwo o podanym id nie istnieje");
                        $scope.crimeFin = '';
                    }
                })
                .error(function () {
                    alert("Nie można pozyskać zasobów");
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

        $scope.addOffense = function () {
            var offensePersonToAdd = {
                'id': $scope.offenseFin.id,
                'idW': $scope.offenseFin.idW,
                'policjant': $scope.offenseFin.policjant.id_policjant,
                'zaklad': $scope.offenseFin.zaklad == undefined ? null : $scope.offenseFin.zaklad.id_zaklad_karny,
                'date': $scope.offenseFin.date == undefined ? null : new Date($scope.offenseFin.date).toLocaleDateString(),
                'dateTo': $scope.offenseFin.dateTo == undefined ? null : new Date($scope.offenseFin.dateTo).toLocaleDateString()
            };

            console.log(offensePersonToAdd);

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:3004/add/offensePerson',
                offensePersonToAdd,
                config
            )
                .success(function (response) {
                    console.log(response);
                    alert("Przypisano wykroczenie o id: " + $scope.offenseFin.idW + " osobie o id: " + $scope.offenseFin.id);
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response);
                    alert("Error!");
                })

        };

        $scope.addOffensePun = function () {
            $scope.offense.date = new Date($scope.offense.date).toLocaleDateString();
            var offenseToAdd = {
                'rule': $scope.offense.rule,
                'opis': $scope.offense.opis,
                'nagana': true,
                'grzywna': $scope.offense.grzywna,
                'ograniczenie': $scope.offense.ograniczenie == '' ? null : $scope.offense.ograniczenie,
                'wiezienie': $scope.offense.wiezienie == '' ? null : $scope.offense.wiezienie,
                'date': $scope.offense.date,
                'country': $scope.address.country,
                'city': $scope.address.city,
                'street': $scope.address.street,
                'number': $scope.address.number,
                'post_code': $scope.address.post_code
            };

            console.log(offenseToAdd);

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:3004/add/offense',
                offenseToAdd,
                config
            )
                .success(function (response) {
                    console.log(response);
                    alert("Dodano nowe wykroczenie o id: " + response[0].offenseinsert);
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response);
                    alert("Error!. Wykroczenie juz istnieje");
                })
        };

        $scope.addCrime = function () {
            var crimePersonToAdd = {
                'id': $scope.crimeFin.id,
                'idW': $scope.crimeFin.idW,
                'policjant': $scope.crimeFin.policjant.id_policjant,
                'zaklad': $scope.crimeFin.zaklad == undefined ? null : $scope.crimeFin.zaklad.id_zaklad_karny,
                'date': $scope.crimeFin.date == undefined ? null : new Date($scope.crimeFin.date).toLocaleDateString(),
                'dateTo': $scope.crimeFin.dateTo == undefined ? null : new Date($scope.crimeFin.dateTo).toLocaleDateString()
            };

            console.log(crimePersonToAdd);

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:3004/add/crimePerson',
                crimePersonToAdd,
                config
            )
                .success(function (response) {
                    console.log(response);
                    alert("Przypisano przestepstwo o id: " + $scope.offenseFin.idW + " osobie o id: " + $scope.offenseFin.id);
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response.name);
                    alert("Error!");
                })

        };

        $scope.addCrimePun = function () {
            $scope.crime.date = new Date($scope.crime.date).toLocaleDateString();
            var crimeToAdd = {
                'rule': $scope.crime.rule,
                'opis': $scope.crime.opis,
                'grzywna': $scope.crime.grzywna,
                'wiezienie': $scope.crime.wiezienie == '' ? null : $scope.crime.wiezienie,
                'date': $scope.crime.date,
                'country': $scope.address.country,
                'city': $scope.address.city,
                'street': $scope.address.street,
                'number': $scope.address.number,
                'post_code': $scope.address.post_code
            };

            console.log(crimeToAdd);

            var config = {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:3004/add/crime',
                crimeToAdd,
                config
            )
                .success(function (response) {
                    console.log(response);
                    alert("Dodano nowe przestępstwo o id: " + response[0].crimeinsert);
                    $state.go($state.current, {}, {reload: true});
                })
                .error(function (response) {
                    console.log(response);
                    alert("Error!. Wykroczenie juz istnieje");
                })
        };

    });